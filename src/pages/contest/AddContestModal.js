import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import * as ContestAction from '../../redux/actions/contestAction';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddContestModal = ({ open, onClose, contestToEdit }) => {
    const dispatch = useDispatch();

    const [contestData, setContestData] = useState({
        // matchId: '',
        contestName: '',
        prizePool: '',
        entryFee: '',
        maxParticipants: '',
    });

    const [matchList, setMatchList] = useState([]);

    // Fetch match data on component mount
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get(
                    'https://rest.entitysport.com/v2/matches/?status=2&token=ec471071441bb2ac538a0ff901abd249'
                );
                if (response.data && response.data.response && response.data.response.items) {
                    setMatchList(response.data.response.items);
                }
            } catch (error) {
                console.error('Failed to fetch matches:', error);
            }
        };

        fetchMatches();
    }, []);

    // Update contest data when editing
    useEffect(() => {
        if (contestToEdit) {
            setContestData({
                matchId: contestToEdit.matchId || '',
                contestName: contestToEdit.contestName || '',
                prizePool: contestToEdit.prizePool || '',
                entryFee: contestToEdit.entryFee || '',
                maxParticipants: contestToEdit.maxParticipants || '',
            });
        } else {
            setContestData({
                matchId: '',
                contestName: '',
                prizePool: '',
                entryFee: '',
                maxParticipants: '',
            });
        }
    }, [contestToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContestData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (contestToEdit) {
            dispatch(
                ContestAction.updateContest({
                    _id: contestToEdit._id,
                    data: contestData,
                    onComplete: () => {
                        onClose(); // Close modal
                        dispatch(ContestAction.getContest()); // Refresh contests
                    },
                })
            );
        } else {
            dispatch(
                ContestAction.createContest({
                    data: contestData,
                    onComplete: () => {
                        onClose(); // Close modal
                        dispatch(ContestAction.getContest()); // Refresh contests
                    },
                })
            );
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
                }}
            >
                <h2>{contestToEdit ? 'Edit Contest' : 'Add Contest'}</h2>
                
                <FormControl fullWidth style={{ marginBottom: '10px' }}>
                    <InputLabel id="match-title-label">Match Title</InputLabel>
                    <Select
                        labelId="match-title-label"
                        value={contestData.matchId}
                        onChange={(e) => setContestData({ ...contestData, matchId: e.target.value })}
                    >
                        {matchList.map((match) => (
                            <MenuItem key={match.match_id} value={match.match_id}>
                                {match.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Contest Name"
                    variant="outlined"
                    fullWidth
                    name="contestName"
                    value={contestData.contestName}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Prize Pool"
                    variant="outlined"
                    fullWidth
                    name="prizePool"
                    value={contestData.prizePool}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Entry Fee"
                    variant="outlined"
                    fullWidth
                    name="entryFee"
                    value={contestData.entryFee}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Max Participants"
                    variant="outlined"
                    fullWidth
                    name="maxParticipants"
                    value={contestData.maxParticipants}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                />

                <div style={{
    display: "flex",
    justifyContent: "flex-end", // Aligns button to the right
    marginBottom: "20px",
    backgroundColor: "#fff"
}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    style={{ marginTop: '20px', backgroundColor:"black" }}
                >
                    {contestToEdit ? 'Update Contest' : 'Add Contest'}
                </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddContestModal;