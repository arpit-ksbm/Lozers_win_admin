import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DeleteSvg, EditSvg } from '../../../assets/svg';
import RouteHeader from '../../../components/common/RouteHeader';
import DatatableHeading from '../../../components/heading/DatatableHeading';
import MainDatatable from '../../../components/datatable/MainDatatable';
import * as SettingActions from '../../../redux/actions/settingAction';
import moment from 'moment';

const Subadmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subadminData } = useSelector(state => state?.settingReducer);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => subadminData.indexOf(row) + 1, width: '80px' },
        { name: 'Name', selector: row => row?.name, },
        { name: 'Email', selector: row => row?.email, },
        { name: 'Phone', selector: row => row?.phoneNumber, },
        { name: 'Created Date', selector: row => moment(row?.created_at).format('DD MMM YYYY') },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('edit-sub-admin', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(SettingActions?.deleteSubadmin(row?._id))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div>, width: '150px'
        },
    ];

    useEffect(() => {
        //! Dispatch API For Get Subadmin
        dispatch(SettingActions.getSubadmin());
    }, []);

    return (
        <>
            <RouteHeader title={'Setting / Sub Admin'} />
            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <DatatableHeading title={'Sub Admin'} data={subadminData} url={'add-sub-admin'} />

                    {/* <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", backgroundColor: "#fff" }}>
                        <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                    </div> */}

                    <MainDatatable columns={columns} data={subadminData} />
                </div>
            </Box>
        </>
    )
}

export default Subadmin;