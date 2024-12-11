import React, { useState } from 'react';
import Header from "../../../layouts/header";
import { Button, Switch, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Breadcrumbs, Link, Typography } from '@mui/material';
import MainDatatable from '../../../components/datatable/MainDatatable';
import { DeepSearchSpace } from '../../../utils/common-function';
import { DeleteSvg, EditSvg } from '../../../assets/svg';
import { Create } from '@mui/icons-material';



const userData = [
    { sno: 14545, orderId: "ORD001", Gameid: "184596", totaluser: "18", status: "Pending", bidamount: "500", winamount: "12", profitamount: "100", spinnerno: "0", centerno: "0", multiply: "2x", createdat: "2023-01-05 02:00 PM" },
    { sno: 14545, orderId: "ORD001", Gameid: "184596", totaluser: "18", status: "Pending", bidamount: "500", winamount: "12", profitamount: "100", spinnerno: "0", centerno: "0", multiply: "2x", createdat: "2023-01-05 02:00 PM" },
    { sno: 14545, orderId: "ORD001", Gameid: "184596", totaluser: "18", status: "Complete", bidamount: "500", winamount: "12", profitamount: "100", spinnerno: "0", centerno: "0", multiply: "2x", createdat: "2023-01-05 02:00 PM" },
    { sno: 14545, orderId: "ORD001", Gameid: "184596", totaluser: "18", status: "Pending", bidamount: "500", winamount: "12", profitamount: "100", spinnerno: "0", centerno: "0", multiply: "2x", createdat: "2023-01-05 02:00 PM" },
    { sno: 14545, orderId: "ORD001", Gameid: "184596", totaluser: "18", status: "Complete", bidamount: "500", winamount: "12", profitamount: "100", spinnerno: "0", centerno: "0", multiply: "2x", createdat: "2023-01-05 02:00 PM" },
];

const DataTableCustomStyles = {
    cells: {
        style: {
            textAlign: "center", color: "rgba(0, 0, 0, 0.6)", whiteSpace: "nowrap", fontSize: "14px", width: "300px",
        },
    },
};

const UpdateCustomerModal = ({ open, handleClose, initialData }) => {
    const [customerName, setCustomerName] = useState(initialData?.name || '');
    const [mobile, setMobile] = useState(initialData?.mobile || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        // Logic to save the updated customer details
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Customer</DialogTitle>
            <DialogContent>
                <TextField
                    label="Customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const UpdateBalanceModal = ({ open, handleClose, initialData }) => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Receive'); // Default type

    const handleSave = () => {
        // Logic to update the balance
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Balance</DialogTitle>
            <DialogContent>
                <TextField
                    label="Username"
                    value={initialData?.name}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Type"
                    select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    fullWidth
                    margin="normal"
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value="Receive">Receive</option>
                    <option value="Send">Send</option>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const UserTeam = () => {
    const [data, setData] = useState(userData);
    const [searchText, setSearchText] = useState('');
    const [customerModalOpen, setCustomerModalOpen] = useState(false);
    const [balanceModalOpen, setBalanceModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleToggle = (sno) => {
        const updatedData = data.map(item =>
            item.sno === sno ? { ...item, active: !item.active } : item
        );
        setData(updatedData);
    };

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
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
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
                />
            </Box>
            <div style={{ padding: "20px" }}>
                <MainDatatable data={filteredData} columns={columns} />
            </div>
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



