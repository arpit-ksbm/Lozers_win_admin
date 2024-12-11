import React, { useEffect, useState } from 'react';
import { FormControlLabel, Grid, Switch } from '@mui/material';
import { Color } from '../../../assets/color';

const DiscountDetailModal = ({ handleDiscountModalClose, handleDiscountDetail, discount, exp }) => {
    const [discountTableActiveHead, setDiscountTableActiveHead] = useState('Discount');
    const [expiry, setExpiry] = useState(false);

    useEffect(() => {
        if (discount?.discountPercent) {
            setDiscountTableActiveHead('Discount');
            setDiscountDetails({
                discountPercent: discount?.discountPercent,
                actualDiscountPercent: discount?.actualDiscountPercent,
                wholeSellerDiscountPercent: discount?.wholeSellerDiscountPercent,
                retailerDiscountPercent: discount?.retailerDiscountPercent,
            })
        }
        if (discount?.discountRate) {
            setDiscountTableActiveHead('Rate');
            setDiscountDetails({
                discountRate: discount?.discountRate,
                actualDiscountRate: discount?.actualDiscountRate,
                wholeSellerDiscountRate: discount?.wholeSellerDiscountRate,
                retailerDiscountRate: discount?.retailerDiscountRate,
            })
        }
        else {
            setDiscountTableActiveHead('Discount');
        }
        setExpiry(exp);
    }, [discount]);

    // State to store discount details
    const [discountDetails, setDiscountDetails] = useState({
        discountPercent: '',
        actualDiscountPercent: '',
        wholeSellerDiscountPercent: '',
        retailerDiscountPercent: '',
    });

    // Handle input change for discount tab
    const handleDiscountInputChange = (e) => {
        setDiscountDetails({ ...discountDetails, [e.target.name]: e.target.value });
    };

    //! Handle Submit 
    const handleSubmit = () => {
        handleDiscountDetail({ discount: discountDetails, expiry });
        handleDiscountModalClose();
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: "600", fontSize: "18px", letterSpacing: "1px" }}>Discount Table</div>
                        <div onClick={() => handleDiscountModalClose()} style={{ cursor: "pointer" }}>X</div>
                    </div>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "20px 0" }}>
                    <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", gap: "5px" }}>
                        <button disabled={discount?.discountRate || discount?.discountPercent} onClick={() => {
                            setDiscountDetails({ discountPercent: '', actualDiscountPercent: '', wholeSellerDiscountPercent: '', retailerDiscountPercent: '', })
                            setDiscountTableActiveHead('Discount')
                        }} style={{ backgroundColor: discountTableActiveHead === 'Discount' ? Color.primary : Color.white, color: discountTableActiveHead === 'Discount' ? Color.white : Color.primary, padding: '5px 10px', borderRadius: '2px', border: `1px solid ${Color.primary}`, cursor: 'pointer' }}>Discount</button>
                        <button disabled={discount?.discountRate || discount?.discountPercent} onClick={() => {
                            setDiscountDetails({ discountRate: '', actualDiscountRate: '', wholeSellerDiscountRate: '', retailerDiscountRate: '' })
                            setDiscountTableActiveHead('Rate')
                        }} style={{ backgroundColor: discountTableActiveHead === 'Rate' ? Color.primary : Color.white, color: discountTableActiveHead === 'Rate' ? Color.white : Color.primary, padding: '5px 15px', borderRadius: '2px', border: `1px solid ${Color.primary}`, cursor: 'pointer' }}>Rate</button>
                    </div>
                </Grid>

                {discountTableActiveHead == 'Discount' && <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "20px 0" }}>
                    <div style={{ border: `1px solid ${Color.borderColor}`, display: "flex", justifyContent: "center", gap: "20px", padding: "10px", borderRadius: "5px", overflowX: "scroll" }}>
                        <table className="purchase-item-table">
                            <thead>
                                <tr style={{ textAlign: "center", backgroundColor: Color.primary, color: Color.white }}>
                                    <td>Discount(%)</td><td>Act.Dis(%)</td><td>W.Seller.Dis(%)</td><td>Ret.Dis(%)</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input name="discountPercent" value={discountDetails.discountPercent} onChange={handleDiscountInputChange} type="text" style={{ outline: "none", border: "none" }} /></td>
                                    <td><input name="actualDiscountPercent" value={discountDetails.actualDiscountPercent} onChange={handleDiscountInputChange} type="text" style={{ outline: "none", border: "none" }} /></td>
                                    <td><input name="wholeSellerDiscountPercent" value={discountDetails.wholeSellerDiscountPercent} onChange={handleDiscountInputChange} type="text" style={{ outline: "none", border: "none" }} /></td>
                                    <td><input name="retailerDiscountPercent" value={discountDetails.retailerDiscountPercent} onChange={handleDiscountInputChange} type="text" style={{ outline: "none", border: "none" }} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Grid>}

                {discountTableActiveHead == 'Rate' && <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "20px 0" }}>
                    <div style={{ border: `1px solid ${Color.borderColor}`, display: "flex", justifyContent: "center", gap: "20px", padding: "10px", borderRadius: "5px", overflowX: "scroll" }}>
                        <table className="purchase-item-table">
                            <thead>
                                <tr style={{ textAlign: "center", backgroundColor: Color.primary, color: Color.white }}>
                                    <td>Discount</td><td>Act.Dis</td><td>W.Seller.Dis</td><td>Ret.Dis</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input name="discountRate" value={discountDetails.discountRate} onChange={handleDiscountInputChange} type="text" style={{ outline: "none", border: "none" }} /></td>
                                    <td><input name="actualDiscountRate" value={discountDetails.actualDiscountRate} onChange={handleDiscountInputChange} type="text" style={{ outline: "none", border: "none" }} /></td>
                                    <td><input name="wholeSellerDiscountRate" value={discountDetails.wholeSellerDiscountRate} onChange={handleDiscountInputChange} type="text" style={{ outline: "none", border: "none" }} /></td>
                                    <td><input name="retailerDiscountRate" value={discountDetails.retailerDiscountRate} onChange={handleDiscountInputChange} type="text" style={{ outline: "none", border: "none" }} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Grid>}

                <Grid item lg={6} md={6} sm={6} xs={6} sx={{ margin: "20px 0" }}>
                    <FormControlLabel
                        control={<Switch color="primary" />}
                        label="Expiry"
                        labelPlacement="start"
                        checked={expiry}
                        onChange={(e) => setExpiry(e.target.checked)}
                    />
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={6} sx={{ margin: "20px 0" }}>
                    <Grid container sx={{ justifyContent: "flex-end" }}>
                        <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "8px 20px", borderRadius: "30px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}

export default DiscountDetailModal;