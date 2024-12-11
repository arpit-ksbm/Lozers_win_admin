import React, { useState } from 'react';
import Header from "../../../layouts/header";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Breadcrumbs, Link, Typography } from '@mui/material';
import MainDatatable from '../../../components/datatable/MainDatatable';
import { DeepSearchSpace } from '../../../utils/common-function';

const userData = [
    { sno: 14545, orderId: "ORD001", user: "184596", amount: "18", payableamount: "12", closingbalance: "500", Withdrawmode: "12", profitamount: "100", status: "Pending", Action : "2x", createdat: "2023-01-05 02:00 PM" },
    { sno: 14545, orderId: "ORD002", user: "184597", amount: "25", payableamount: "56", closingbalance: "750", Withdrawmode: "15", profitamount: "200", status: "Pending", Action : "2x", createdat: "2023-01-06 02:30 PM" },
    { sno: 14546, orderId: "ORD003", user: "184598", amount: "50", payableamount: "56", closingbalance: "300", Withdrawmode: "20", profitamount: "150", status: "Pending", Action : "2x", createdat: "2023-01-07 03:00 PM" },
    { sno: 14547, orderId: "ORD004", user: "184599", amount: "40", payableamount: "86", closingbalance: "450", Withdrawmode: "25", profitamount: "250", status: "Complete", Action : "2x", createdat: "2023-01-08 04:00 PM" },
    { sno: 14548, orderId: "ORD005", user: "184600", amount: "35", payableamount: "102", closingbalance: "600", Withdrawmode: "30", profitamount: "300", status: "Pending", Action : "2x", createdat: "2023-01-09 05:00 PM" },
];

const Withdraw = () => {
    const [data, setData] = useState(userData);
    const [searchText, setSearchText] = useState('');

    const handleApprove = (user) => {
        const isConfirmed = window.confirm("Are you sure you want to approve?");
        
        if (isConfirmed) {
            // Update the status of the user from "Pending" to "Complete"
            const updatedData = data.map(item => 
                item.orderId === user.orderId ? { ...item, status: "Complete" } : item
            );
            setData(updatedData);
        }
    };

    const handleReject = (user) => {
        const isConfirmed = window.confirm("Are you sure you want to reject?");
        
        if (isConfirmed) {
            // Update the status of the user from "Pending" to "Rejected"
            const updatedData = data.map(item => 
                item.orderId === user.orderId ? { ...item, status: "Rejected" } : item
            );
            setData(updatedData);
        }
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = DeepSearchSpace(data, searchText);

    const columns = [
        { name: 'ID.', selector: row => row.orderId },
        { name: 'User', selector: row => row.user },
        { name: 'Amount', selector: row => row.amount },
        { name: 'payableamount', selector: row => row.payableamount },
        { name: 'Closing Balance', selector: row => row.closingbalance },
        { name: 'Withdraw Mode', selector: row => row.Withdrawmode },
        { 
            name: 'status', 
            selector: row => row.status,
            cell: row => (
                <span style={{ color: row.status === 'Complete' ? 'green' : row.status === 'Rejected' ? 'red' : 'red' }}>
                    {row.status}
                </span>
            )
        },
        { name: 'Created At', selector: row => row.createdat },
        {
            name: 'Action',
            cell: row => (
                row.status === 'Pending' ? (
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleApprove(row)}
                            style={{ marginRight: 8 }}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => handleReject(row)}
                        >
                            Reject
                        </Button>
                    </Box>
                ) : (
                    <Typography>No Action</Typography>
                )
            )
        }
    ];

    return (
        <>
            <Header />
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/games">
                        Games
                    </Link>
                    <Typography color="text.primary">Withdraw</Typography>
                </Breadcrumbs>

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
        </>
    );
};

export default Withdraw;
