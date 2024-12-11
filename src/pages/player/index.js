import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Color } from '../../assets/color';
import RouteHeader from '../../components/common/RouteHeader';
import { DeepSearchSpace, IndianRupee } from '../../utils/common-function';
import MainDatatable from '../../components/datatable/MainDatatable';
import DatatableHeading from '../../components/heading/DatatableHeading';
import { CrossSvg, DeleteSvg, EditSvg, SwitchOffSvg, SwitchOnSvg, WalletSvg } from '../../assets/svg';
import * as PlayerActions from '../../redux/actions/playerAction';

const Player = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { playerData } = useSelector(state => state?.playerReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(playerData, searchText);

    const [walletModal, setWalletModal] = useState(false);
    const [userId, setUserId] = useState('');

    const handleWalletModalOpen = (data) => {
        console.log("Cus Id ::: ", data)
        setUserId(data)
        setWalletModal(true)
    };

    const handleWalletModalClose = () => {
        setWalletModal(false)
        setInputFieldDetail({ amount: '', type: '' });
    };

    const [inputFieldDetail, setInputFieldDetail] = useState({ amount: '', type: '' });
    const [inputFieldError, setInputFieldError] = useState({ amount: '', type: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    };

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;

        const { amount, type } = inputFieldDetail;
        if (!amount) {
            handleInputFieldError("amount", "Please Enter Amount")
            isValid = false;
        }
        if (!type) {
            handleInputFieldError("type", "Please Select Type")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit : Wallet
    const handleSubmit = () => {
        if (handleValidation()) {
            console.log({ ...inputFieldDetail, userId });

            const payload = {
                data: {
                    player_id: userId, amount: inputFieldDetail.amount,
                    type: inputFieldDetail?.type
                },
                onComplete: () => {
                    setWalletModal(false)
                    handleWalletModalClose()
                }
            };

            //! Dispatching API
            dispatch(PlayerActions?.updatePlayerWallet(payload))
        } else {
            console.log('Validation Error !!!');
        }
    };

    //* Datatable Columns 
    const columns = [
        { name: 'S.No.', selector: row => filteredData?.indexOf(row) + 1, width: '80px' },
        { name: 'User ID', selector: row => row?.userId },
        { name: 'Mobile', selector: row => row?.phoneNumber ? row?.phoneNumber : 'N/A' },
        { name: 'Balance', selector: row => IndianRupee(row?.amount), width: '140px' },
        { name: 'Status', selector: row => <div onClick={() => dispatch(PlayerActions?.changePlayerStatus({ playerId: row?._id }))} style={{ cursor: 'pointer', display: 'flex', alignItems: "center" }}>{row?.status == 'unblock' ? <>Block <SwitchOnSvg /> Unblock</> : <>Block <SwitchOffSvg /> Unblock</>}</div> },
        { name: 'Created Date', selector: row => moment(row?.created_at).format('DD MMM YYYY') },
        {
            name: 'Action',
            cell: row => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    {/* <div style={{ cursor: "pointer" }} onClick={() => navigate('edit-player', { state: { stateData: row } })} ><EditSvg /></div> */}
                    {/* <div style={{ cursor: "pointer" }} ><DeleteSvg /></div> */}
                    <div style={{ cursor: "pointer" }} onClick={() => handleWalletModalOpen(row?._id)} ><WalletSvg /></div>
                </div>
            ), width: '150px',
        },
    ];

    useEffect(() => {
        //! Dispatch API For Get Subadmin
        dispatch(PlayerActions?.getPlayer());
    }, []);


    return (
        <>
            <RouteHeader title={`Player`} />
            <Box sx={{ p: 3 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <DatatableHeading title={'Player'} data={playerData} />

                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", backgroundColor: "#fff" }}>
                        <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                    </div>

                    <MainDatatable columns={columns} data={filteredData} />
                </div>
            </Box>

            {/* Wallet Modal */}
            <Dialog open={walletModal} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '35vw' }, minWidth: { xs: '90vw', sm: '35vw' } } }}>
                <DialogContent >
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                <div>Wallet</div>
                                <div onClick={() => handleWalletModalClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <TextField
                                label={<>Amount <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                                name='amount'
                                value={inputFieldDetail?.amount}
                                onChange={handleInputField}
                                error={inputFieldError.amount ? true : false}
                                helperText={inputFieldError.amount}
                                onFocus={() => handleInputFieldError("amount", null)}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Type</InputLabel>
                                <Select
                                    style={{ backgroundColor: "#fff", minHeight: "43px", }}
                                    label="Type" variant="outlined" fullWidth
                                    name='type'
                                    value={inputFieldDetail?.type}
                                    onChange={handleInputField}
                                    error={inputFieldError?.type ? true : false}
                                    onFocus={() => handleInputFieldError("type", null)}
                                >
                                    <MenuItem disabled>---Select Type---</MenuItem>
                                    <MenuItem value={'add'}>Add</MenuItem>
                                    <MenuItem value={'deduct'}>Deduct</MenuItem>
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
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Player;