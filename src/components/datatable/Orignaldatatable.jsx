import React, { useState } from 'react';
import Header from "../../../layouts/header";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Breadcrumbs, Link, Typography } from '@mui/material';
import MainDatatable from '../../../components/datatable/MainDatatable';
import { DeepSearchSpace } from '../../../utils/common-function';

const UserTeam = () => {
    const [data, setData] = useState(userData);
    const [searchText, setSearchText] = useState('');
    const [customerModalOpen, setCustomerModalOpen] = useState(false);
    const [balanceModalOpen, setBalanceModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleOpenCustomerModal = (user) => {
        setCurrentUser(user);
        setCustomerModalOpen(true);
    };

    const handleCloseCustomerModal = () => {
        setCustomerModalOpen(false);
        setCurrentUser(null);
    };

    const handleOpenBalanceModal = (user) => {
        setCurrentUser(user);
        setBalanceModalOpen(true);
    };

    const handleCloseBalanceModal = () => {
        setBalanceModalOpen(false);
        setCurrentUser(null);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = DeepSearchSpace(data, searchText);

    const columns = [
        { name: 'ID.', selector: row => row.orderId },
        { name: 'User', selector: row => row.Gameid },
        { name: 'Kisne Invite Kiya (1st level)', selector: row => row.status },
        { name: 'Kisne Invite Kiya (2nd level)', selector: row => row.totaluser },
        { name: 'Kisne Invite Kiya (3rd level)', selector: row => row.bidamount },
        { name: 'Level one count', selector: row => row.winamount },
        { name: 'Level two count', selector: row => row.profitamount },
        { name: 'Level three count', selector: row => row.spinnerno },
        { name: 'Created At', selector: row => row.createdat },
    ];

    return (
        <>
            <Header />
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ p: 2, textAlign: 'center' }}
            >
                {/* Breadcrumbs */}
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/games">
                        Team
                    </Link>
                    <Typography color="text.primary">User Team</Typography>
                </Breadcrumbs>

                {/* Search Bar */}
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchText}
                    onChange={handleSearchChange}
                    sx={{ textAlign: 'center' }} // Center-align the search bar
                />
            </Box>
            <Box sx={{ padding: "20px", textAlign: 'center' }}>
                <MainDatatable data={filteredData} columns={columns} />
            </Box>
            {currentUser && (
                <UpdateCustomerModal
                    open={customerModalOpen}
                    handleClose={handleCloseCustomerModal}
                    initialData={currentUser}
                />
            )}
            {currentUser && (
                <UpdateBalanceModal
                    open={balanceModalOpen}
                    handleClose={handleCloseBalanceModal}
                    initialData={currentUser}
                />
            )}
        </>
    );
};

export default UserTeam;
