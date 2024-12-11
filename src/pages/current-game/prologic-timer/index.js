import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PrologicTimerImageData } from '../../../utils/static-data';
import { Color } from '../../../assets/color';
import { IndianRupee } from '../../../utils/common-function';
import * as CurrentGameActions from '../../../redux/actions/currentGameAction';

const PrologicTimer = () => {
    const dispatch = useDispatch();
    const { currentPTGameIdData, currentPTGameTotalBetsData, currentPTGameTimerData } = useSelector(state => state?.currentGameReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ winningNumber: '', betImage: '' });
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
        setInputFieldDetail({ winningNumber: '', betImage: '' });
    };

    const handleSubmit = async (e) => {

        const payload = {
            data: {
                gameId: currentPTGameIdData?._id,
                winningNumber: Number(inputFieldDetail?.winningNumber),
                bet_image: Number(inputFieldDetail?.betImage)
            },
            onComplete: () => console.log('handleResetInputField()')
        }

        dispatch(CurrentGameActions.currentPTGameWinnerByAdmin(payload));
    };

    useEffect(() => {
        dispatch(CurrentGameActions.getCurrentPTGameId());
        dispatch(CurrentGameActions.getCurrentPTGameTotalBets());

        const timerInterval = setInterval(() => {
            dispatch(CurrentGameActions.getCurrentPTGameTimer({ onComplete: () => handleResetInputField() }));
        }, 1000);

        // Todo : Cleanup interval on component unmount
        return () => clearInterval(timerInterval);

    }, []);

    return (
        <>
            <Box sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Current Game id: {currentPTGameIdData?.game_id}
                </Typography>

                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: "20px" }}>
                        <div>Image with total bid amount.</div>
                        <div>Total Amount : {IndianRupee(currentPTGameTotalBetsData?.totalBetAmount)}</div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: "10px" }}>
                        {PrologicTimerImageData.map((value, index) => (
                            <div key={index} align="center">
                                <div style={{ background: '#AC2E28', padding: "5px 10px", borderRadius: "5px" }}>
                                    <img src={value?.image} style={{ height: "50px", width: "50px" }} />
                                    <div style={{ color: "#FFF" }}>{value?.id}</div>
                                </div>
                                <div style={{ padding: "10px 5px", minWidth: "140px" }}>{Object.keys(currentPTGameTotalBetsData).length > 0 && IndianRupee(currentPTGameTotalBetsData?.totalBets[`${index + 1}`])}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <Box style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }} sx={{ mt: 4 }}>
                    <Typography style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold" }} variant="body1" gutterBottom>
                        Timer (Seconds): {currentPTGameTimerData}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Total Users: 0</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="Spinner number" variant="outlined" fullWidth
                                name="winningNumber"
                                value={inputFieldDetail?.winningNumber}
                                onChange={handleInputField}
                                error={inputFieldError.winningNumber ? true : false}
                                // helperText={inputFieldError.winningNumber}
                                onFocus={() => handleInputFieldError("winningNumber", null)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Center Image Stop* (enter 2 for 2x)</InputLabel>
                                <Select
                                    label="Center Image Stop* (enter 2 for 2x)" variant="outlined" fullWidth
                                    name="betImage"
                                    value={inputFieldDetail?.betImage}
                                    onChange={handleInputField}
                                    error={inputFieldError.betImage ? true : false}
                                    // helperText={inputFieldError.betImage}
                                    onFocus={() => handleInputFieldError("betImage", null)}
                                >
                                    <MenuItem value="" disabled>---Select---</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    {/* <MenuItem value="4">4</MenuItem> */}
                                </Select>
                            </FormControl>

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

export default PrologicTimer;