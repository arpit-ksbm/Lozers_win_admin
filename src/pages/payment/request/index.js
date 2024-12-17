import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RouteHeader from '../../../components/common/RouteHeader';
import { DeepSearchSpace, IndianRupee } from '../../../utils/common-function';
import MainDatatable from '../../../components/datatable/MainDatatable';
import DatatableHeading from '../../../components/heading/DatatableHeading';
import { SwitchOffSvg, SwitchOnSvg } from '../../../assets/svg';
import * as PaymentActions from '../../../redux/actions/paymentAction';

const Request = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { paymentRequestData } = useSelector(state => state?.paymentReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(paymentRequestData, searchText);

    //* Datatable Columns 
    const columns = [
        { name: 'S.No.', selector: row => filteredData?.indexOf(row) + 1, width: '80px' },
        { name: 'User ID', selector: row => row?.user_id?._id || 'N/A' },
        { name: 'Mobile', selector: row => row?.user_id?.phoneNumber || 'N/A' },
        { name: 'Balance', selector: row => IndianRupee(row?.user_id?.walletBalance), width: '150px' },
        { name: 'Req.Amt', selector: row => IndianRupee(row?.amount), width: '150px' },
        { name: 'Req.Date', selector: row => moment(row?.createdAt).format('DD MMM YYYY') },
        { name: 'Req.Time', selector: row => moment(row?.createdAt).format('hh:mm A') },
        {
            name: "Change Status",
            cell: (row) => (
                <select value={row?.status} onChange={(e) => dispatch(PaymentActions.approveRejectPaymentRequest({ request_id: row?._id, userid: row?.user_id?._id, status: e.target.value }))} style={{ outline: "none", padding: "5px 8px", border: "1px solid #666666", color: "#666666", borderRadius: "5px", fontFamily: "Philosopher" }}>
                    <option value={''}>---Select---</option>
                    <option value={'Pending'}>Pending</option>
                    <option value={'Approved'}>Approve</option>
                    <option value={'Rejected'}>Reject</option>
                </select>
            ),
        },
    ];

    useEffect(() => {
        //! Dispatch API For Getting Payment Request
        dispatch(PaymentActions.getPaymentRequest());
    }, []);

    return (
        <>
            <RouteHeader title={`Payment / Request`} />
            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <DatatableHeading title={'Request'} data={paymentRequestData} />

                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", backgroundColor: "#fff" }}>
                        <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                    </div>

                    <MainDatatable columns={columns} data={filteredData} />
                </div>
            </Box>
        </>
    )
}

export default Request;