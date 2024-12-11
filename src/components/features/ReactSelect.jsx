import { components } from 'react-select';

// Custom component to render the selected items
export const MultiValue = (props) => {
    return (
        <components.MultiValue {...props}>
            <div>{props.data.name}</div>
        </components.MultiValue>
    );
};

// Custom component for the remove button
export const MultiValueRemove = (props) => {
    return (
        <components.MultiValueRemove {...props}>
            <span>&times;</span>
        </components.MultiValueRemove>
    );
};

// Custom component to render options
export const CustomOption = (props) => {
    const { label, name, company, qty, hsnCode } = props.data;
    return (
        <components.Option {...props}>
            {props.data.value === 'all' ? (
                <div style={{ display: "flex", justifyContent: "space-between", gap: '5px' }}>
                    <span style={{ flex: 1, padding: "0 5px", textAlign: "left" }}>{label}</span>
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "space-between", gap: '5px' }}>
                    <span style={{ flex: 1, padding: "0 5px", textAlign: "left" }}>{name}</span>
                    <span style={{ flex: 1, padding: "0 5px", textAlign: "left" }}>{company}</span>
                    <span style={{ flex: 1, padding: "0 5px", textAlign: "left" }}>{qty}</span>
                    <span style={{ flex: 1, padding: "0 5px", textAlign: "left" }}>{hsnCode}</span>
                </div>
            )}
        </components.Option>
    );
};

// Custom component to render the menu with header
export const CustomMenu = (props) => {
    return (
        <components.Menu {...props}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: '5px', padding: "5px 28px 5px 10px" }}>
                <span style={{ flex: 1, padding: "0 5px", textAlign: "left", fontWeight: "bold" }}>Name</span>
                <span style={{ flex: 1, padding: "0 5px", textAlign: "left", fontWeight: "bold" }}>Company</span>
                <span style={{ flex: 1, padding: "0 5px", textAlign: "left", fontWeight: "bold" }}>Qty</span>
                <span style={{ flex: 1, padding: "0 5px", textAlign: "left", fontWeight: "bold" }}>HSN Code</span>
            </div>
            {props.children}
        </components.Menu>
    );
};