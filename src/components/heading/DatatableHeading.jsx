import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import { Color } from '../../assets/color';

const DatatableHeading = ({ title, url, data = [{}] }) => {
    const navigate = useNavigate();

    console.log(title, "0967986");
    
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", backgroundColor: "#fff" }}>
                <div style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>{title}</div>

                <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                    <CSVLink data={data} style={{ color: "#000", fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} >
                        <div style={{ fontSize: "16px", fontWeight: "600", color: 'black' }}>Download</div>
                        <DownloadIcon />
                    </CSVLink>

                    {url && <div onClick={() => navigate(url)} style={{ fontWeight: "600", backgroundColor: Color.primary, color: Color.white, padding: "2px 5px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                        <div style={{ fontSize: "15px" }}>Add</div>
                        <div style={{ fontWeight: "bold", fontSize: "18px" }}>+</div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default DatatableHeading;