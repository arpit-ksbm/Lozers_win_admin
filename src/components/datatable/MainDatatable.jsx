import React from 'react';
import DataTable from 'react-data-table-component';
import { Color } from '../../assets/color';
import { useSelector } from 'react-redux';
import Loader from '../features/Loader';

const MainDatatable = ({ data, columns }) => {
    console.log(data, columns, '0909');
    
    const { isLoading } = useSelector(state => state?.commonReducer)


    const DataTableCustomStyles = {
        cells: {
            style: {
                textAlign: "center", color: "rgba(0, 0, 0, 0.6)", whiteSpace: "nowrap", fontSize: "14px", width: "140px",
            },
        },
        rows: {
            style: {
                minHeight: '60px', backgroundColor: Color.white,
            },
        },
        headRow: {
            style: {
                whiteSpace: 'nowrap', fontSize: "16px", fontWeight: "500", color: Color.white, backgroundColor: Color.black, borderRadius: '10px',
            }
        }
    };

    return (
        <>
            {isLoading ? <Loader /> : <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={DataTableCustomStyles}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
                fixedHeader
            />}
        </>
    )
}

export default MainDatatable;