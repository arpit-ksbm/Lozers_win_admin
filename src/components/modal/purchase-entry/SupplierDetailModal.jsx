import React, { useState } from 'react'
import { Grid } from '@mui/material';
import { Color } from '../../../assets/color';
import DataTable from 'react-data-table-component';
import { SelectSvg } from '../../../assets/svg';
import { DayMonthYear, DeepSearchSpace } from '../../../utils/common-function';
import { CommonDataTableCustomStyles } from '../../../assets/styles';

const SupplierDetailModal = ({ data = [], title, handleSupplierDetail, handleModalClose, supplier }) => {
    const [searchText, setSearchText] = useState(supplier ? supplier : '');

    const handleSearch = (event) => setSearchText(event.target.value);
    const filteredData = DeepSearchSpace(data, searchText);

    const columns = [
        { name: 'S.No.', selector: row => filteredData?.indexOf(row) + 1 },
        { name: 'Business Name', selector: row => row?.businessName },
        { name: 'City', selector: row => row?.city },
        { name: 'Balance', selector: row => row?.balance },
        {
            name: 'Action', cell: row => <div onClick={() => {
                handleSupplierDetail(row)
                handleModalClose()
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
                            data={filteredData}
                            pagination
                            customStyles={CommonDataTableCustomStyles}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                            paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
                            fixedHeader
                        />
                    </Grid>

                    <Grid item md={5} xs={12} sx={{ padding: "20px", backgroundColor: Color.greyBg, borderRadius: "10px" }}>
                        <div style={{ fontSize: "20px", fontWeight: "500", color: Color.white, textAlign: "center", marginBottom: "10px" }}>Supplier Details</div>

                        <div style={{ backgroundColor: "#FFF", padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: '15px' }}>
                            <div style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "30px", cursor: "pointer", fontSize: "15px", textAlign: "center" }}>{filteredData[0]?.local_central ? filteredData[0]?.local_central : 'N/A'}</div>

                            <div style={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                                <div style={{ fontSize: "20px", fontWeight: "600" }}>{filteredData[0]?.businessName ? filteredData[0]?.businessName : 'N/A'}</div>
                                <div>Created Date - {filteredData[0]?.createdAt ? DayMonthYear(filteredData[0]?.createdAt) : 'N/A'}</div>
                            </div>

                            <hr style={{ border: "1px dashed black" }} />

                            <Grid container spacing={2}>
                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Address-</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.address ? filteredData[0]?.address + '--' + filteredData[0]?.pincode : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Tel no -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.telNo ? filteredData[0]?.telNo : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Email -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.email ? filteredData[0]?.email : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>GST No -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.gstNo ? filteredData[0]?.gstNo : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Pan No -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.panCard ? filteredData[0]?.panCard : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Bank -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.bankName ? filteredData[0]?.bankName : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>Bank Acc. -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.bankAccount ? filteredData[0]?.bankAccount : 'N/A'}</div>
                                </Grid>

                                <Grid item lg={4} sm={4} md={4} xs={4}>
                                    <div style={{ fontSize: "16.5px" }}>DL No -</div>
                                </Grid>
                                <Grid item lg={8} sm={8} md={8} xs={8}>
                                    <div style={{ fontSize: '15px' }}>{filteredData[0]?.drugLicense1 ? filteredData[0]?.drugLicense1 : 'N/A'}</div>
                                </Grid>
                            </Grid>

                            <hr style={{ border: "1px dashed black" }} />

                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "center" }}
                                    onClick={() => {
                                        handleSupplierDetail(filteredData[0])
                                        handleModalClose()
                                    }}
                                >
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

export default SupplierDetailModal;