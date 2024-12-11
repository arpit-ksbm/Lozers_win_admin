import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import RouteHeader from '../../components/common/RouteHeader';
import MainDatatable from '../../components/datatable/MainDatatable';
import AddContestModal from './AddContestModal'; // Import the modal component
import * as ContestAction from '../../redux/actions/contestAction';

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
        
        dispatch(
            ContestAction.deleteContest(contestId) // Pass only the ID
        );
        
        
    };

    const columns = [
        { name: 'S.No.', selector: (row, index) => index + 1, width: '80px' },
        { name: 'Contest Name', selector: row => row?.contestName },
        { name: 'Prize Pool', selector: row => row?.prizePool },
        { name: 'Entry Fee', selector: row => row?.entryFee },
        { name: 'Max Participants', selector: row => row?.maxParticipants },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <Button variant="outlined" onClick={() => handleEditContest(row)}>
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteContest(row._id)}
                        style={{ marginLeft: '10px' }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <RouteHeader title={`Contest`} />
            <Box sx={{ p: 3 }}>
                <div style={{
                    background: "#ffffff", padding: "25px", borderRadius: "10px", boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", backgroundColor: "#fff" }}>
                        <div style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>Contest</div>
                        <Button variant="contained" style={{backgroundColor:'black'}} onClick={handleOpenModal}>
                            Add Contest
                        </Button>
                    </div>

                    <MainDatatable columns={columns} data={contestData} />
                </div>
            </Box>

            <AddContestModal open={openModal} onClose={() => setOpenModal(false)} contestToEdit={contestToEdit} />
        </>
    );
};

export default Contest;