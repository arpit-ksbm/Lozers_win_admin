import React, { useEffect, useState } from 'react'
import RouteHeader from '../../../../components/common/RouteHeader';
import { Color } from '../../../../assets/color';
import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowBack } from '@mui/icons-material';
import * as SettingActions from '../../../../redux/actions/settingAction';

const AddSubadmin = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location?.state?.stateData;

    const dispatch = useDispatch();

    const [subAdminPermission, setSubAdminPermission] = useState([]);
    const [inputFieldDetail, setInputFieldDetail] = useState({ name: stateData ? stateData?.name : '', email: stateData ? stateData?.email : '', contact: stateData ? stateData?.phoneNumber : '', password: stateData ? stateData?.password : '' });
    const [inputFieldError, setInputFieldError] = useState({ name: '', email: '', contact: '', password: '', subAdminPermission: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //* Handle Sub Admin Permission
    const handleSubAdminPermission = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSubAdminPermission([...subAdminPermission, value]);
        } else {
            setSubAdminPermission(subAdminPermission.filter(item => item !== value));
        }
    };

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { name, email, contact, password } = inputFieldDetail;

        if (!name) {
            handleInputFieldError("name", "Please Enter Name")
            isValid = false;
        }
        if (!email) {
            handleInputFieldError("email", "Please Enter Email")
            isValid = false;
        }
        if (!contact) {
            handleInputFieldError("contact", "Please Enter contact")
            isValid = false;
        }
        if (!password) {
            handleInputFieldError("password", "Please Enter password")
            isValid = false;
        }
        if (subAdminPermission.length <= 0) {
            handleInputFieldError("subAdminPermission", "Please Select Permission")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit - Creating Sub Admin
    const handleSubmit = async () => {
        if (handleValidation()) {
            console.log("Sub Admin Detail :: ", { ...inputFieldDetail, permission: subAdminPermission })

            const { name, email, contact, password } = inputFieldDetail;
            const payload = {
                id: stateData?._id,
                data: {
                    name, email, phoneNumber: contact, password, permissions: subAdminPermission,
                },
                onComplete: () => navigate("/admin/setting/sub-admin")
            }

            if (stateData) {
                console.log("State Data :: ", stateData);
                dispatch(SettingActions.updateSubadmin(payload));
            } else {
                //! Dispatching API for creating Sub-Admin
                dispatch(SettingActions.createSubadmin(payload));
            }
        }
    }

    const subAdminPermissionData = [
        { name: "Dashboard" },
        { name: "Player" },
        { name: "Users" },
        { name: "Contest" },
        // { name: "Game History" },
        { name: "Current Game" },
        { name: "Payment" },
        { name: "Setting" },
    ];

    useEffect(() => {
        if (stateData) {
            setSubAdminPermission(stateData?.Permissions);
        }
    }, []);

    return (
        <>
            <RouteHeader title={`Setting / Sub Admin / ${mode} Sub Admin`} />

            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} sm={12} md={12} xs={12}><ArrowBack onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} /></Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} >
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
                        <Grid item lg={6} md={6} sm={12} xs={12} >
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
                        <Grid item lg={6} md={6} sm={12} xs={12} >
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

                        <Grid item lg={6} sm={12} md={12} xs={12}>
                            <TextField
                                label="Password" variant='outlined' fullWidth
                                name='password'
                                value={inputFieldDetail?.password}
                                onChange={handleInputField}
                                error={inputFieldError.password ? true : false}
                                helperText={inputFieldError.password}
                                onFocus={() => handleInputFieldError("password", null)}
                            />
                        </Grid>

                        <Grid item lg={12} sm={12} md={12} xs={12}>
                            <FormLabel component="legend">Permission</FormLabel>
                            <FormGroup aria-label="position" row >
                                {subAdminPermissionData?.map((value, index) => {
                                    const permittedData = subAdminPermission?.find(curr => curr === value?.name)
                                    return <div key={index}>
                                        <FormControlLabel
                                            label={value.name} control={<Checkbox checked={permittedData == value?.name} />}
                                            name={value.name}
                                            value={value.name}
                                            onChange={(e) => handleSubAdminPermission(e)}
                                            onFocus={() => handleInputFieldError("subAdminPermission", null)}
                                        />
                                    </div>
                                })}
                            </FormGroup>
                            {inputFieldError?.subAdminPermission && <div style={{ color: "#D32F2F", fontSize: "10px", padding: "10px 0 0 15px" }}>{inputFieldError?.subAdminPermission}</div>}
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

export default AddSubadmin;