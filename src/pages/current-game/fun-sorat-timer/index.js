import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FunSoratTimerImageData } from '../../../utils/static-data';
import { Color } from '../../../assets/color';
import { IndianRupee } from '../../../utils/common-function';
import * as CurrentGameActions from '../../../redux/actions/currentGameAction';

const FunSoratTimer = () => {
    const dispatch = useDispatch();
    const { currentFSTGameIdData, currentFSTGameTotalBetsData, currentFSTGameTimerData } = useSelector(state => state?.currentGameReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ winningNumber: '' });
    const [inputFieldError, setInputFieldError] = useState({});

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    };

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //* Handle Reset Input Field : Data
    const handleResetInputField = (e) => {
        setInputFieldDetail({ winningNumber: '' });
    };

    const handleSubmit = async (e) => {

        const payload = {
            data: {
                gameId: currentFSTGameIdData?._id,
                winningNumber: Number(inputFieldDetail?.winningNumber),
            },
            onComplete: () => console.log('handleResetInputField()')
        }

        dispatch(CurrentGameActions.currentFSTGameWinnerByAdmin(payload));
    };

    useEffect(() => {
        dispatch(CurrentGameActions.getCurrentFSTGameId());
        dispatch(CurrentGameActions.getCurrentFSTGameTotalBets());

        const timerInterval = setInterval(() => {
            dispatch(CurrentGameActions.getCurrentFSTGameTimer({ onComplete: () => handleResetInputField() }));
        }, 1000);

        // Todo : Cleanup interval on component unmount
        return () => clearInterval(timerInterval);

    }, []);

    return (
        <>
            <Box sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Current Game id: {currentFSTGameIdData?.game_id}
                </Typography>

                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: "20px" }}>
                        <div>Image with total bid amount.</div>
                        <div>Total Amount : {IndianRupee(currentFSTGameTotalBetsData?.totalBetAmount)}</div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: "10px" }}>
                        {FunSoratTimerImageData.map((value, index) => (
                            <div key={index} align="center">
                                <div style={{ background: '#AC2E28', padding: "5px 10px", borderRadius: "5px" }}>
                                    <img src={value?.image} style={{ height: "50px", width: "50px" }} />
                                    <div style={{ color: "#FFF" }}>{value?.id}</div>
                                </div>
                                <div style={{ padding: "10px 5px", minWidth: "140px" }}>{Object.keys(currentFSTGameTotalBetsData).length > 0 && IndianRupee(currentFSTGameTotalBetsData?.totalBets[`${index + 1}`])}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <Box style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }} sx={{ mt: 4 }}>
                    <Typography style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold" }} variant="body1" gutterBottom>
                        Timer (Seconds): {currentFSTGameTimerData}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Total Users: 0</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Spinner number" variant="outlined" fullWidth
                                name="winningNumber"
                                value={inputFieldDetail?.winningNumber}
                                onChange={handleInputField}
                                error={inputFieldError.winningNumber ? true : false}
                                // helperText={inputFieldError.winningNumber}
                                onFocus={() => handleInputFieldError("winningNumber", null)}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container sx={{ justifyContent: "space-between" }}>
                                <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Update</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>

    );
}

export default FunSoratTimer;