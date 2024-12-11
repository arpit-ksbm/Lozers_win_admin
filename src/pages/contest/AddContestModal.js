import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import * as ContestAction from '../../redux/actions/contestAction';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddContestModal = ({ open, onClose, contestToEdit }) => {
    const dispatch = useDispatch();

    const initialData = {
        contestName: '',
        prizePool: '',
        entryFee: '',
        maxParticipants: '',
    };

    const [contestData, setContestData] = useState(initialData);

    useEffect(() => {
        if (contestToEdit) {
            setContestData({
                contestName: contestToEdit.contestName || '',
                prizePool: contestToEdit.prizePool || '',
                entryFee: contestToEdit.entryFee || '',
                maxParticipants: contestToEdit.maxParticipants || '',
            });
        } else {
            setContestData(initialData);
        }
    }, [contestToEdit]);

    // Reset fields when the modal is closed
    useEffect(() => {
        if (!open) {
            setContestData(initialData);
        }
    }, [open]);

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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    style={{ marginTop: '20px' }}
                >
                    {contestToEdit ? 'Update Contest' : 'Add Contest'}
                </Button>
            </div>
        </Modal>
    );
};

export default AddContestModal;
