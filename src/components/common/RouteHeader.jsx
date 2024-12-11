import React from 'react'
import { Color } from '../../assets/color'
import { FaBars } from "react-icons/fa";
import * as CommonActions from "../../redux/actions/commonAction"
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

const RouteHeader = ({ title }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location?.pathname?.split('/')[1].split('')[0]?.toUpperCase() + location?.pathname?.split('/')[1].split('').filter((value, index) => index != 0).join('')
    const { isSidebarOpen } = useSelector(state => state?.commonReducer);

    return (
        <Box sx={{ pl: 3, pt: 1.8, display: "flex", alignItems: "center", gap: "10px" }}>
            <FaBars onClick={() => dispatch(CommonActions.setIsSidebarOpne(!isSidebarOpen))} style={{ height: "40px", cursor: "pointer" }} />
            <div style={{ fontWeight: "500", fontSize: "18px" }}>{path} / <span style={{ color: Color.secondary }}>{title}</span></div>
        </Box>
    )
}

export default RouteHeader;