import React, { useEffect, useState } from 'react'
import { Color } from '../../../assets/color';
import { Grid } from '@mui/material';

const SchemeDetailModal = ({ handleFreeQtyModalClose, data, scheme, handleFreeQtySchemeDetail }) => {

    const [schemeDetail, setSchemeDetail] = useState([{ key: '', value: '' }, { key: '', value: '' }]);
    const [minimum, setMinimum] = useState(false);

    //* Onchange Handler For Scheme Detail 
    const handleSchemeDetail = (index, field, value) => {
        const newSchemeDetail = [...schemeDetail];
        newSchemeDetail[index][field] = value;
        setSchemeDetail(newSchemeDetail);
    };

    //* Function : Adding Next Row Field 
    const handleAddSchemeDetailField = () => {
        setSchemeDetail([...schemeDetail, { key: '', value: '' }]);
    };

    //! Onfocus Handler - Tracking Current Index For Adding Next Row Field 
    const handleFocusSchemeDetail = (index) => {
        if (index === schemeDetail.length - 1) handleAddSchemeDetailField();
    };

    //! Handle Submit 
    const handleSubmit = () => {
        console.log("Scheme Detail ::: ", schemeDetail);
        handleFreeQtySchemeDetail({ scheme: schemeDetail.filter(value => value?.key != '' || value?.value != ''), minimum });
        handleFreeQtyModalClose();
    };

    useEffect(() => {
        console.log("Scheme ::: ", scheme);
        if (scheme?.length > 0) {
            setSchemeDetail(scheme);
        }
        setMinimum(data?.minimum)
    }, [scheme]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: "600", fontSize: "18px", letterSpacing: "1px" }}>Scheme Table</div>
                        <div onClick={() => handleFreeQtyModalClose()} style={{ cursor: "pointer" }}>X</div>
                    </div>
                </Grid>

                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <Grid item lg={12} sm={12} md={12} xs={12}>Qty : {data?.qty}</Grid>
                            <Grid item lg={12} sm={12} md={12} xs={12}>Free Qty : {data?.fQty}</Grid>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <div>Minimum</div> <input checked={minimum} onChange={(e) => setMinimum(e.target.checked)} type='checkbox' />
                        </div>
                    </div>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "20px 0" }}>
                    <div style={{ border: `1px solid ${Color.borderColor}`, display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px", padding: "10px", borderRadius: "5px", height: "200px", overflowY: "scroll" }}>
                        <table className="purchase-item-table">
                            <thead>
                                <tr style={{ textAlign: "center", backgroundColor: Color.primary, color: Color.white }}>
                                    <td>Quantity</td><td>Free Quantity</td>
                                </tr>
                            </thead>

                            <tbody style={{}}>
                                {schemeDetail.map((row, index) => (
                                    <tr key={index}>
                                        <td><input value={row?.key} onChange={(e) => handleSchemeDetail(index, 'key', e.target.value)} onFocus={() => handleFocusSchemeDetail(index)} type="text" disabled={index > 0 && schemeDetail[index - 1].value === ""} style={{ outline: "none", border: "none" }} /></td>
                                        <td><input value={row?.value} onChange={(e) => handleSchemeDetail(index, 'value', e.target.value)} onFocus={() => handleFocusSchemeDetail(index)} type="text" disabled={index > 0 && schemeDetail[index - 1].value === ""} style={{ outline: "none", border: "none" }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "20px 0" }}>
                    <Grid container sx={{ justifyContent: "flex-end" }}>
                        <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "8px 20px", borderRadius: "30px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}

export default SchemeDetailModal;