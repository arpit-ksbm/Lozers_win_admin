import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import RouteHeader from '../../components/common/RouteHeader';
import MainDatatable from '../../components/datatable/MainDatatable';
import * as UsersAction from '../../redux/actions/usersAction';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../layouts/header';

const Users = () => {
    const dispatch = useDispatch();
    const { usersData } = useSelector((state) => state?.usersReducer);
    const [updatedUsers, setUpdatedUsers] = useState([]);

    useEffect(() => {
        dispatch(UsersAction?.getUsers());
    }, [dispatch]);

    useEffect(() => {
        if (usersData) {
            setUpdatedUsers(usersData);
        }
    }, [usersData]);

    // API call to update status
    const handleStatusChange = async (userId, newStatus) => {
        try {
            // Call the API to update the status on the server
            await dispatch(UsersAction.updateUserStatus({
                _id: userId,
                data: { status: newStatus }
            }));
    
            // Update the local state to reflect the status change
            setUpdatedUsers((prevUsers) => 
                prevUsers.map((user) => 
                    user._id === userId ? { ...user, status: newStatus } : user
                )
            );
            toast.success("Status Updated")
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    
    

    const columns = [
        { name: 'S.No.', selector: (row, index) => index + 1, width: '80px' },
        { name: 'User Name', selector: (row) => (row?.name ? row?.name : '----------') },
        { name: 'Mobile Number', selector: (row) => row?.phoneNumber },
        { name: 'Wallet', selector: (row) => row?.walletBalance },
        {
            name: 'Status',
            cell: (row) => {
                console.log(row._id, '000'); // Log the entire row to inspect the structure
                return (
                    <div
                        style={{
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: row.status === 'Active' ? '#a8e6a0' : '#f7a0a0',
                            color: 'black',
                            cursor: 'pointer',
                            textAlign: 'center',
                        }}
                        onClick={() => handleStatusChange(row._id, row.status === 'Active' ? 'In-Active' : 'Active')}
                    >
                        {row.status}
                    </div>
                );
            }
            
        },
    ];

    return (
        <>
        <Header />
            {/* <RouteHeader title={`Users`} /> */}
            <Box sx={{ p: 3 }}>
                <div
                    style={{
                        background: '#ffffff',
                        padding: '25px',
                        borderRadius: '10px',
                        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                            backgroundColor: '#fff',
                        }}
                    >
                        <div style={{ fontSize: '20px', fontWeight: '600', color: 'black' }}>Users</div>
                    </div>

                    <MainDatatable columns={columns} data={updatedUsers} />
                </div>
            </Box>
        </>
    );
};

export default Users;
