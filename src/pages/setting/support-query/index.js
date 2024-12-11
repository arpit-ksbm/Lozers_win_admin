import React, { useState } from 'react';
import { Dialog, DialogContent, Grid } from '@mui/material';
import { Color } from '../../../assets/color';
import { ViewSvg } from '../../../assets/svg';
import RouteHeader from '../../../components/common/RouteHeader';
import DatatableHeading from '../../../components/heading/DatatableHeading';
import DatatableWithSearch from '../../../components/datatable/DatatableWithSearch';

const SupportQuery = () => {
    const supportQueryData = [{ name: 'Name' }, {}, {}];

    //* Modal 
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = (index) => { setModalOpen(true) };
    const handleModalClose = () => { setModalOpen(false) };

    const columns = [
        { name: 'S.No.', selector: row => supportQueryData?.indexOf(row) + 1 },
        { name: 'User', selector: row => row?.name },
        { name: 'From', selector: row => row?.name },
        { name: 'Category', selector: row => row?.name },
        { name: 'Sub Category', selector: row => row?.name },
        { name: 'Description', selector: row => row?.name },
        {
            name: "Status",
            cell: (row) => (
                <select value={row?.status} onChange={(e) => console.log(e.target.value)} style={{ outline: "none", padding: "5px 8px", border: "1px solid #666666", color: "#666666", borderRadius: "5px" }}>
                    <option value="">---Select---</option>
                    <option value={'Received'}>Received</option>
                    <option value={'In-transit'}>In-transit</option>
                    <option value={'Return'}>Return</option>
                </select>
            ),
            width: "140px", center: true
        },
        {
            name: 'Action',
            cell: row => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center", paddingRight: "15px" }}>
                    <div onClick={() => handleModalOpen()} style={{ cursor: "pointer" }}><ViewSvg w='30' h='25' /></div>
                </div>
            ),
            right: true, width: "100px"
        },
    ];

    return (
        <>
            <div style={{ padding: "10px" }}>
                <RouteHeader title={'Support Query'} />

                <div style={{ backgroundColor: Color.white, padding: "20px", borderRadius: "10px" }}>
                    <DatatableHeading title={'Support Query'} data={supportQueryData} />

                    <DatatableWithSearch data={supportQueryData} columns={columns} />
                </div>
            </div>

            <Dialog open={modalOpen} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '40vw' }, minWidth: { xs: '90vw', sm: '40vw' } } }}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ fontSize: "18px", fontWeight: "bold" }}>Description</div>
                                <div onClick={() => handleModalClose()} style={{ cursor: "pointer" }}>X</div>
                            </div>
                        </Grid>

                        <Grid item lg={12} sm={12} md={12} xs={12}>
                            <div style={{ padding: "20px" }}>Fniomniojio</div>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SupportQuery;