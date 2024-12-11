import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Color } from '../../../assets/color';
import DataTable from 'react-data-table-component';
import { SelectSvg } from '../../../assets/svg';
import { DeepSearchSpace, IndianRupee } from '../../../utils/common-function';
import { CommonDataTableCustomStyles } from '../../../assets/styles';

const ItemDetailModal = ({ data = [], title, item, handleSingleItemDetail, handleItemModalClose }) => {
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState(item ? item : '');
    const handleSearch = (event) => setSearchText(event.target.value);
    const filteredData = DeepSearchSpace(data, searchText);

    const columns = [
        { name: 'Item Name', selector: row => row?.name },
        { name: 'HSN Code', selector: row => row?.hsnCode?.name },
        { name: 'Pack', selector: row => row?.packing?.name },
        { name: 'Company', selector: row => row?.company?.name },
        { name: 'Min.Qty', selector: row => row?.minQty },
        { name: 'Stock', selector: row => row?.stockQuantity },
        {
            name: 'Action', cell: row => <div onClick={() => {
                handleSingleItemDetail(row)
                handleItemModalClose()
            }} style={{ cursor: "pointer" }}><SelectSvg /></div>, center: true
        },
    ];

    return (
        <>
            <div style={{ padding: "20px", }}>
                <Grid container spacing={2} gap={2} sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Grid item md={6} xs={12} sx={{ border: `1px solid ${Color.borderColor}`, padding: "20px", backgroundColor: "#fff", borderRadius: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", backgroundColor: "#fff" }}>
                            <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>{title}</div>

                            <input style={{
                                padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc',
                                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                                width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none',
                            }} type='search' value={searchText} onChange={handleSearch} placeholder='Search your data...' />
                        </div>

                        <DataTable
                            columns={columns}
                            data={filteredData?.sort((a, b) => new Date(b.created) - new Date(a.created))}
                            pagination
                            customStyles={CommonDataTableCustomStyles}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                            paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
                            fixedHeader
                        />
                    </Grid>

                    <Grid item md={5} xs={12} sx={{ padding: "20px", backgroundColor: Color.greyBg, borderRadius: "10px" }}>
                        <div style={{ fontSize: "20px", fontWeight: "500", color: Color.white, textAlign: "center", marginBottom: "10px" }}>Item Details</div>

                        <div style={{ backgroundColor: "#FFF", padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: '15px' }}>
                            <Grid container spacing={4}>
                                <Grid item lg={8} sm={12} md={12} xs={12} sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <div>HSN CODE</div>
                                    <div style={{ fontSize: "20px", fontWeight: "600" }}>{filteredData[0]?.hsnCode ? filteredData[0]?.hsnCode?.name : 'N/A'}</div>
                                </Grid>
                            </Grid>

                            <hr style={{ border: "1px dashed black" }} />

                            <Grid container spacing={2}>
                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Name -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.name ? filteredData[0]?.name : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Company -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.company ? filteredData[0]?.company?.name : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Mrp -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.mrp ? IndianRupee(filteredData[0]?.mrp) : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Medicine Type -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.ethicalGeneric ? filteredData[0]?.ethicalGeneric : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Min Quantity -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.minQty ? filteredData[0]?.minQty : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Stock -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.stockQuantity ? filteredData[0]?.stockQuantity : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Location -</div>
                                </Grid>

                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.warehouse ? filteredData[0]?.warehouse?.name : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={12} sm={12} md={12} xs={12}>
                                    <div style={{ fontSize: "16.5px" }}>{filteredData[0]?.antiTB && 'Anti TB ,'} {filteredData[0]?.fridgeItem && 'Fridge Item ,'} {filteredData[0]?.banItem && 'Ban Item ,'} {filteredData[0]?.narcotic && 'Narcotic Item ,'} {filteredData[0]?.foodLicense && 'Food License ,'}</div>
                                </Grid>
                            </Grid>

                            <hr style={{ border: "1px dashed black" }} />

                            <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
                                <div style={{ display: "flex", justifyContent: "center" }}
                                    onClick={() => {
                                        handleSingleItemDetail(filteredData[0])
                                        handleItemModalClose()
                                    }}
                                >
                                    <div style={{ fontWeight: "500", backgroundColor: Color.white, color: Color.primary, padding: "5px 30px", borderRadius: "30px", cursor: "pointer", fontSize: "15px", textAlign: "center", border: `1px solid ${Color.primary}` }}>Select</div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div onClick={() => navigate('/items/add-items')} style={{ fontWeight: "500", backgroundColor: Color.white, color: Color.primary, padding: "5px 30px", borderRadius: "30px", cursor: "pointer", fontSize: "15px", textAlign: "center", border: `1px solid ${Color.primary}` }}>Add</div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ItemDetailModal;