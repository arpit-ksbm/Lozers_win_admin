import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Grid, TextField } from '@mui/material';
import { Color } from '../../../assets/color';
import RouteHeader from '../../../components/common/RouteHeader';
import * as PlayerActions from '../../../redux/actions/playerAction';

const AddPlayer = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location?.state?.stateData;

    const [inputFieldDetail, setInputFieldDetail] = useState({ name: stateData ? stateData?.name : '', email: stateData ? stateData?.email : '', contact: stateData ? stateData?.phoneNumber : '' });
    const [inputFieldError, setInputFieldError] = useState({ name: '', email: '', contact: '', email: '', subAdminPermission: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { name, email, contact } = inputFieldDetail;
        if (!name) {
            handleInputFieldError("name", "Please Enter Name")
            isValid = false;
        }
        if (!email) {
            handleInputFieldError("email", "Please Enter Email")
            isValid = false;
        }
        if (!contact) {
            handleInputFieldError("contact", "Please Enter Contact Number")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit - Creating Player
    const handleSubmit = async () => {
        if (handleValidation()) {
            console.log("Player Detail :: ", { ...inputFieldDetail })

            const { name, email, contact } = inputFieldDetail;
            const payload = {
                data: {
                    name, email, phoneNumber: contact
                },
                onComplete: () => navigate("/admin/player")
            }

            if (stateData) {
                console.log("State Data :: ", stateData);
            } else {
                //! Dispatching API For Creating Player
                dispatch(PlayerActions.createPlayer(payload))
            }
        }
    }

    return (
        <>
            <RouteHeader title={`Player / ${mode} Player`} />
            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} sm={12} md={12} xs={12}><ArrowBack onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} /></Grid>

                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <TextField
                                label="Name" variant='outlined' fullWidth
                                name='name'
                                value={inputFieldDetail?.name}
                                onChange={handleInputField}
                                error={inputFieldError.name ? true : false}
                                helperText={inputFieldError.name}
                                onFocus={() => handleInputFieldError("name", null)}
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                label="Email" variant='outlined' fullWidth
                                name='email'
                                value={inputFieldDetail?.email}
                                onChange={handleInputField}
                                error={inputFieldError.email ? true : false}
                                helperText={inputFieldError.email}
                                onFocus={() => handleInputFieldError("email", null)}
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <TextField
                                label="Contact" variant='outlined' fullWidth
                                name='contact'
                                value={inputFieldDetail?.contact}
                                onChange={handleInputField}
                                error={inputFieldError.contact ? true : false}
                                helperText={inputFieldError.contact}
                                onFocus={() => handleInputFieldError("contact", null)}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container sx={{ justifyContent: "space-between" }}>
                                <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </>
    )
}

export default AddPlayer;