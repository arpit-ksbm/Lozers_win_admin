import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, IconButton } from '@mui/material';
import RouteHeader from '../../components/common/RouteHeader';
import MainDatatable from '../../components/datatable/MainDatatable';
import AddContestModal from './AddContestModal'; // Import the modal component
import * as ContestAction from '../../redux/actions/contestAction';
import Header from '../../layouts/header';
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

const Contest = () => {
    const dispatch = useDispatch();
    const { contestData } = useSelector(state => state?.contestReducer);
    const [openModal, setOpenModal] = useState(false);
    const [contestToEdit, setContestToEdit] = useState(null);

    useEffect(() => {
        dispatch(ContestAction?.getContest());
    }, [dispatch]);

    const handleOpenModal = () => {
        setContestToEdit(null); // Clear any existing contest being edited
        setOpenModal(true);
    };

    const handleEditContest = (contest) => {
        
        setContestToEdit(contest); // Set the contest to edit
        setOpenModal(true); // Open the modal
    };

    const handleDeleteContest = (contestId) => {
        console.log(contestId, '09099');
        dispatch(ContestAction.deleteContest(contestId)); // Pass only the ID
    };

    const columns = [
        { name: 'S.No.', selector: (row, index) => index + 1, width: '80px' },
        { name: 'Contest Name', selector: row => row?.contestName },
        { name: 'Prize Pool', selector: row => row?.prizePool },
        { name: 'Entry Fee', selector: row => row?.entryFee },
        { name: 'Max Participants', selector: row => row?.maxParticipants },
        { name: 'Discount', selector: row => row?.discount },
        { name: 'Prize', selector: row => row?.prize },
        {
            name: 'Actions',
            cell: (row) => (
                <div style={{ display: 'flex', gap: '1px' }}>
                    <IconButton 
                        onClick={() => handleEditContest(row)} 
                        title="Edit Contest"
                        style={{ color: '#1976d2' }} // Blue color for edit button
                    >
                        <RiEdit2Line size={20} /> {/* Increased icon size */}
                    </IconButton>
                    <IconButton 
                        onClick={() => handleDeleteContest(row._id)} 
                        title="Delete Contest"
                        style={{ color: '#d32f2f' }} // Red color for delete button
                    >
                        <MdDeleteForever size={22} /> {/* Increased icon size */}
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <>
            <Header />
            <Box sx={{ p: 3 }}>
                <div style={{
                    background: "#ffffff", 
                    padding: "25px", 
                    borderRadius: "10px", 
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)"
                }}>
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        marginBottom: "20px", 
                        backgroundColor: "#fff" 
                    }}>
                        <div style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>Contest</div>
                        <Button 
                            variant="contained" 
                            style={{ backgroundColor: 'black' }} 
                            onClick={handleOpenModal}
                        >
                            Add Contest
                        </Button>
                    </div>

                    <MainDatatable columns={columns} data={contestData} />
                </div>
            </Box>

            <AddContestModal 
                open={openModal} 
                onClose={() => setOpenModal(false)} 
                contestToEdit={contestToEdit} 
            />
        </>
    );
};

export default Contest;
