import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Color } from '../../../assets/color';
import RouteHeader from '../../../components/common/RouteHeader';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import * as SettingActions from '../../../redux/actions/settingAction';

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { adminDetailData } = useSelector(state => state?.authReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ type: '' });
    const [inputFieldError, setInputFieldError] = useState({ type: '' });

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
        const { type } = inputFieldDetail;

        if (!type) {
            handleInputFieldError("type", "Please Select")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit
    const handleSubmit = async () => {
        if (handleValidation()) {
            console.log("Detail :: ", { ...inputFieldDetail })

            const { type } = inputFieldDetail;
            const payload = {
                data: {
                    adminId: adminDetailData?._id, profit: type
                },
                onComplete: () => setInputFieldDetail({ type: '' })
            }
            //! Dispatching API
            dispatch(SettingActions.setProfit(payload))
        }
    };

    return (
        <>
            <RouteHeader title={'Settings'} />

            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} sm={12} md={12} xs={12}><ArrowBack onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} /></Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Min/Max</InputLabel>
                                <Select
                                    style={{ backgroundColor: "#fff", minHeight: "43px", }}
                                    label="Min/Max" variant="outlined" fullWidth
                                    name='type'
                                    value={inputFieldDetail?.type}
                                    onChange={handleInputField}
                                    error={inputFieldError?.type ? true : false}
                                    onFocus={() => handleInputFieldError("type", null)}
                                >
                                    <MenuItem disabled>---Select---</MenuItem>
                                    <MenuItem value={'min'}>Min</MenuItem>
                                    <MenuItem value={'max'}>Max</MenuItem>
                                </Select>
                            </FormControl>
                            {inputFieldError?.type && <div style={{ color: "#F44C35", fontSize: "12.5px", padding: "3px 15px 0 15px" }}>{inputFieldError?.type}</div>}
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

export default Settings;