import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import RouteHeader from '../../../components/common/RouteHeader';
import { Color } from '../../../assets/color';
import { Box, Grid, TextField } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import * as SettingActions from '../../../redux/actions/settingAction';

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { adminDetailData } = useSelector(state => state?.authReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ email: '', password: '', confirmPassword: '' });
    const [inputFieldError, setInputFieldError] = useState({ email: '', password: '', confirmPassword: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { email, oldPassword, password, confirmPassword } = inputFieldDetail;

        // if (!email) {
        //     handleInputFieldError("email", "Please Enter Email")
        //     isValid = false;
        // }
        if (email) {
            const emailValid = EmailValidator.validate(email)
            if (!emailValid) {
                handleInputFieldError("email", "Please Enter Valid Email")
                isValid = false;
            }
        }
        if (!password) {
            handleInputFieldError("password", "Please Enter Password")
            isValid = false;
        }
        if (password != confirmPassword) {
            handleInputFieldError("confirmPassword", "Please Enter Same Password")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit
    const handleSubmit = async () => {
        if (handleValidation()) {
            console.log("Detail :: ", { ...inputFieldDetail })

            const { email, password, confirmPassword } = inputFieldDetail;
            const payload = {
                data: {
                    adminId: adminDetailData?._id, email, password, newPassword: confirmPassword
                },
                onComplete: () => setInputFieldDetail({ email: '', password: '', confirmPassword: '' })
            }
            //! Dispatching API for Changing Password
            dispatch(SettingActions.changeAdminPassword(payload))
        }
    };

    return (
        <>
            <RouteHeader title={'Setting / Change Password'} />

            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} sm={12} md={12} xs={12}><ArrowBack onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} /></Grid>

                        {/* <Grid item lg={4} md={4} sm={12} xs={12} >
                            <TextField
                                label="Email" variant='outlined' fullWidth
                                name='email'
                                value={inputFieldDetail?.email}
                                onChange={handleInputField}
                                error={inputFieldError.email ? true : false}
                                helperText={inputFieldError.email}
                                onFocus={() => handleInputFieldError("email", null)}
                            />
                        </Grid> */}

                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                label="New Password" variant='outlined' fullWidth
                                name='password'
                                value={inputFieldDetail?.password}
                                onChange={handleInputField}
                                error={inputFieldError.password ? true : false}
                                helperText={inputFieldError.password}
                                onFocus={() => handleInputFieldError("password", null)}
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                label="Confirm New Password" variant='outlined' fullWidth
                                name='confirmPassword'
                                value={inputFieldDetail?.confirmPassword}
                                onChange={handleInputField}
                                error={inputFieldError.confirmPassword ? true : false}
                                helperText={inputFieldError.confirmPassword}
                                onFocus={() => handleInputFieldError("confirmPassword", null)}
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

export default ChangePassword;