import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import RouteHeader from '../../../components/common/RouteHeader';
import { DeepSearchSpace } from '../../../utils/common-function';
import MainDatatable from '../../../components/datatable/MainDatatable';
import DatatableHeading from '../../../components/heading/DatatableHeading';
import * as GameHistoryActions from '../../../redux/actions/gameHistoryAction';

const PrologicTimer = () => {
    const dispatch = useDispatch();
    const { ptGameHistoryData } = useSelector(state => state?.gameHistoryReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(ptGameHistoryData, searchText);

    const columns = [
        { name: 'S.No.', selector: row => filteredData?.indexOf(row) + 1 },
        { name: 'Game ID', selector: row => row?.gameId },
        { name: 'Total User', selector: row => row?.numberOfPlayers },
        { name: 'Bid Amount', selector: row => row?.totalBetAmount },
        { name: 'Win Amount', selector: row => row?.amountDistributed },
        { name: 'Profit Amount', selector: row => row?.profit },
        { name: 'Spinner No.', selector: row => row?.winningNumber },
        { name: 'Center Image', selector: row => row?.betImage ? row?.betImage : 'N/A' },
        { name: 'Multiply By', selector: row => row?.totalBetAmountMultipliedBy10 },
    ];

    useEffect(() => {
        //! Dispatch API For Get PT History
        dispatch(GameHistoryActions.getPTGameHistory());
    }, []);

    return (
        <>
            <RouteHeader title={`Astro 777`} />
            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", BiBorderRadius: "10px", boxshadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <DatatableHeading title={'Astro 777'} data={ptGameHistoryData} />

                    {/* <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", backgroundColor: "#fff" }}>
                        <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                    </div> */}

                    <MainDatatable columns={columns} data={filteredData} />
                </div>
            </Box>
        </>
    )
}

export default PrologicTimer;