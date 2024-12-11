import { Color } from "../color";

//* DataTable Styles
export const DataTableCustomStyles = {
    cells: {
        style: {
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.6)", whiteSpace: "nowrap",
            fontSize: "14px"
        },
    },
    rows: {
        style: {
            minHeight: '35px',
            backgroundColor: Color.white,
        },
    },
    headRow: {
        style: {
            whiteSpace: 'nowrap',
            fontSize: "16px",
            fontWeight: "500", color: Color.white,
            backgroundColor: Color.primary,
            borderRadius: '10px',
        }
    }
};


export const CommonDataTableCustomStyles = {
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