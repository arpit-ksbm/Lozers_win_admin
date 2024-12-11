import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { SelectSvg } from '../../../assets/svg';
import { Grid } from '@mui/material';
import { Color } from '../../../assets/color';
import { DeepSearchSpace } from '../../../utils/common-function';

const ItemBatchModal = ({ item, data = [{ name: "" }], batchName, handleItemBatchDetail, handleItemBatchModalClose }) => {
    const [searchText, setSearchText] = useState(batchName ? batchName : '');
    const handleSearch = (event) => setSearchText(event.target.value);

    const filteredData = DeepSearchSpace(data, searchText);

    const DataTableCustomStyles = {
        cells: {
            style: {
                textAlign: "center", color: "rgba(0, 0, 0, 0.6)", whiteSpace: "nowrap", fontSize: "14px", width: "120px",
            },
        },
        rows: {
            style: {
                minHeight: '40px', backgroundColor: Color.white,
            },
        },
        headRow: {
            style: {
                whiteSpace: 'nowrap', fontSize: "16px", fontWeight: "500", color: Color.white, backgroundColor: Color.primary, borderRadius: '10px',
            }
        }
    };

    const columns = [
        { name: 'Batch', selector: row => row?.name },
        { name: 'Exp.Date', selector: row => row.date },
        { name: 'Discount', selector: row => row.rate },
        { name: 'Mrp', selector: row => row.rate },
        { name: 'Pur.Rate', selector: row => row.prate },
        { name: 'Sale.Rate(PTR)', selector: row => row.prate },
        { name: 'Qty.', selector: row => row.qty },
        { name: 'F.Qty.', selector: row => row.qty },
        {
            name: 'Action', cell: row => <div onClick={() => {
                handleItemBatchDetail(row)
                handleItemBatchModalClose()
            }} style={{ cursor: "pointer" }}><SelectSvg /></div>, center: true
        },
    ];

    return (
        <>
            <div style={{ padding: "20px", }}>
                <Grid container spacing={2} gap={2} sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Grid item md={6} xs={12} sx={{ border: `1px solid ${Color.borderColor}`, padding: "20px", backgroundColor: "#fff", borderRadius: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", backgroundColor: "#fff" }}>
                            <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>{item} Batch</div>

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
                            customStyles={DataTableCustomStyles}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                            paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
                            fixedHeader
                        />
                    </Grid>

                    <Grid item md={5} xs={12} sx={{ padding: "20px", backgroundColor: Color.greyBg, borderRadius: "10px" }}>
                        <div style={{ fontSize: "20px", fontWeight: "500", color: Color.white, textAlign: "center", marginBottom: "10px" }}>Batch Details</div>

                        <div style={{ backgroundColor: "#FFF", padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: '15px' }}>
                            <Grid container spacing={4}>
                                <Grid item lg={6} sm={12} md={12} xs={12} sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                    <div>HSN CODE</div>
                                    <div style={{ fontSize: "18px", fontWeight: "600" }}>{filteredData[0]?.hsnCode ? filteredData[0]?.hsnCode : 'N/A'}</div>
                                </Grid>
                                <Grid item lg={6} sm={12} md={12} xs={12} sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                    <div>Expiry</div>
                                    <div style={{ fontSize: "18px", fontWeight: "600" }}>{filteredData[0]?.hsnCode ? filteredData[0]?.hsnCode : 'N/A'}</div>
                                </Grid>
                            </Grid>

                            <hr style={{ border: "1px dashed black" }} />

                            <Grid container spacing={2}>
                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Batch Name -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.name ? filteredData[0]?.name : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Item Name -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.name ? filteredData[0]?.name : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Discount -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.company ? filteredData[0]?.company : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>A.Discount -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.company ? filteredData[0]?.company : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>W.S.Discount -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.company ? filteredData[0]?.company : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>R.Discount -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.company ? filteredData[0]?.company : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Total Stock -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.minQty ? filteredData[0]?.minQty : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Scheme -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.genType ? filteredData[0]?.genType : 'N/A'}</div>
                                </Grid>
                            </Grid>

                            <hr style={{ border: "1px dashed black" }} />

                            <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
                                <div onClick={() => {
                                    handleItemBatchDetail(filteredData[0])
                                    handleItemBatchModalClose()
                                }} style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ fontWeight: "500", backgroundColor: Color.white, color: Color.primary, padding: "5px 30px", borderRadius: "30px", cursor: "pointer", fontSize: "15px", textAlign: "center", border: `1px solid ${Color.primary}` }}>Select</div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ItemBatchModal;