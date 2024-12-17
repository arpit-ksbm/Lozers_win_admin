import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import RouteHeader from '../../../components/common/RouteHeader';
import { DeepSearchSpace, IndianRupee } from '../../../utils/common-function';
import MainDatatable from '../../../components/datatable/MainDatatable';
import DatatableHeading from '../../../components/heading/DatatableHeading';
import * as PaymentActions from '../../../redux/actions/paymentAction';

const History = () => {
    const dispatch = useDispatch();
    const { paymentHistoryData } = useSelector(state => state?.paymentReducer);

    console.log(paymentHistoryData, "paumrnthistroydasyat");
    

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(paymentHistoryData, searchText);

    //* Datatable Columns 
    const columns = [
        { name: 'S.No.', selector: row => filteredData?.indexOf(row) + 1, width: '80px' },
        { name: 'User ID', selector: row => row?.user_id?._id || 'N/A' },
        { name: 'Mobile', selector: row => row?.user_id?.phoneNumber || 'N/A' },
        { name: 'Closing Balance', selector: row => IndianRupee(row?.user_id?.walletBalance), width: '180px' },
        { name: 'Req.Amt', selector: row => IndianRupee(row?.amount), width: '150px' },
        { name: 'Req.Date', selector: row => moment(row?.createdAt).format('DD MMM YYYY') },
        { name: 'Req.Time', selector: row => moment(row?.createdAt).format('hh:mm A') },
        { name: 'Status', selector: row => <div style={{ cursor: 'pointer', textTransform: 'capitalize', color: row?.status == 'Approved' ? 'green' : 'red' }}>{row?.status}</div> },
    ];

    useEffect(() => {
        //! Dispatch API For Getting Payment History
        dispatch(PaymentActions.getPaymentHistory());
    }, []);

    return (
        <>
            <RouteHeader title={`Payment / History`} />
            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <DatatableHeading title={'History'} data={paymentHistoryData} />

                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", backgroundColor: "#fff" }}>
                        <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                    </div>

                    <MainDatatable columns={columns} data={filteredData} />
                </div>
            </Box>
        </>
    )
}

export default History;