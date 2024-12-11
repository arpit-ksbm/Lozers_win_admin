import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, TextField, Table, TableBody, TableCell, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Color } from '../../../assets/color';
import { IndianRupee } from '../../../utils/common-function';
import * as CurrentGameActions from '../../../redux/actions/currentGameAction';

const FunTargetTimer = () => {
  const dispatch = useDispatch();
  const { currentFTTGameIdData, currentFTTGameTotalBetsData, currentFTTGameTimerData } = useSelector(state => state?.currentGameReducer);

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
        gameId: currentFTTGameIdData?._id,
        winningNumber: Number(inputFieldDetail?.winningNumber),
        bet_image: Number(inputFieldDetail?.betImage)
      },
      onComplete: () => console.log('handleResetInputField()')
    }

    dispatch(CurrentGameActions.currentFTTGameWinnerByAdmin(payload));
  };

  useEffect(() => {
    dispatch(CurrentGameActions.getCurrentFTTGameId());
    dispatch(CurrentGameActions.getCurrentFTTGameTotalBets());

    const timerInterval = setInterval(() => {
      dispatch(CurrentGameActions.getCurrentFTTGameTimer({ onComplete: () => handleResetInputField() }));
    }, 1000);

    // Todo : Cleanup interval on component unmount
    return () => clearInterval(timerInterval);

  }, []);

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Current Game id: {currentFTTGameIdData?.game_id}
        </Typography>

        <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: "20px" }}>
            <div>Image with total bid amount.</div>
            <div>Total Amount : {IndianRupee(currentFTTGameTotalBetsData?.totalBetAmount)}</div>
          </div>

          <Table style={{ background: "#fff8f2" }} sx={{ mb: 2, border: '1px solid #ccc' }}>
            <TableBody>
              <TableRow>
                {Array(10).fill('').map((value, index) => (
                  <TableCell key={index} align="center">
                    {index + 1}-{Object.keys(currentFTTGameTotalBetsData).length > 0 && IndianRupee(currentFTTGameTotalBetsData?.totalBets[`${index + 1}`])}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Box style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }} sx={{ mt: 4 }}>
          <Typography style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold" }} variant="body1" gutterBottom>
            Timer (Seconds): {currentFTTGameTimerData}
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
                onFocus={() => handleInputFieldError("winningNumber", null)}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Center Image Stop* (enter 2 for 2x, 4 for 4x)</InputLabel>
                <Select
                  label="Center Image Stop* (enter 2 for 2x, 4 for 4x)" variant="outlined" fullWidth
                  name="betImage"
                  value={inputFieldDetail?.betImage}
                  onChange={handleInputField}
                  error={inputFieldError.betImage ? true : false}
                  onFocus={() => handleInputFieldError("betImage", null)}
                >
                  <MenuItem disabled>---Select---</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="4">4</MenuItem>
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

export default FunTargetTimer;