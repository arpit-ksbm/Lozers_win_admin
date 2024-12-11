import React, { useEffect, useState } from 'react'
import { Color } from '../../assets/color';
import DataTable from 'react-data-table-component';
import { DeepSearchSpace } from '../../utils/common-function';

const DatatableWithSearch = ({ data = [], columns }) => {
    const [searchText, setSearchText] = useState('');

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
                minHeight: '60px', backgroundColor: Color.white,
            },
        },
        headRow: {
            style: {
                whiteSpace: 'nowrap', fontSize: "16px", fontWeight: "500", color: Color.white, backgroundColor: Color.primary, borderRadius: '10px',
            }
        }
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", backgroundColor: "#fff" }}>
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
        </>
    )
}

export default DatatableWithSearch;