import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, Menu, MenuItem, Typography, Divider, ListItemIcon } from '@mui/material';
import { Person, AccountBox, Lock, HelpOutline, Logout } from '@mui/icons-material';
import * as Actions from '../../redux/actions/commonAction';
import { HambergerSvg } from "../../assets/svg";
import "../../assets/styles/header.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { isSidebarOpen } = useSelector((state) => state.commonReducer);
  const { adminDetailData } = useSelector(state => state?.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Menu Toggle
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout
  const handleLogout = () => {
    try {
      localStorage.clear();
      setAnchorEl(null); // Close menu after logout
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header style={{ marginTop: '0px', backgroundColor: "#fff" }}>
      <div className="header_apper">
        {/* Use your SVG component to toggle sidebar */}
        <div onClick={() => dispatch(Actions.setIsSidebarOpne(!isSidebarOpen))}>
          <HambergerSvg h="35" w="40" />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleClick} size="small">
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtH-XSHWFFSXKBa4UCNof8eF3AkBgdoo1AQ&s" alt="Keanu Reeves" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                width: 250,
                padding: 1,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> 
              <div>
                <Typography variant="body1">{adminDetailData?.name}</Typography>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate('admin/setting/change-password')}>
              <ListItemIcon>
                <Lock fontSize="small" />
              </ListItemIcon>
              Reset Password
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <HelpOutline fontSize="small" />
              </ListItemIcon>
              Help
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
