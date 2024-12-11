import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField } from '@mui/material';
import { Color } from '../../../../../assets/color';
import { DeleteSvg, EditSvg, ViewSvg } from '../../../../../assets/svg';
import RouteHeader from '../../../../../components/common/RouteHeader';
import DatatableWithSearch from '../../../../../components/datatable/DatatableWithSearch';
import DatatableHeading from '../../../../../components/heading/DatatableHeading';
import * as MasterActions from '../../../../../redux/actions/masterAction';

const SubCategory = () => {
    const [mode, setMode] = useState('Add');
    const dispatch = useDispatch();
    const supportSubCategoryData = [{ title: 'Sub Cat One' }, { title: 'Sub Cat Two' }];

    const [inputFieldDetail, setInputFieldDetail] = useState({ title: '' });
    const [inputFieldError, setInputFieldError] = useState({});

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //* Handle Reset 
    const handleReset = () => {
        setInputFieldDetail({ name: '' });
        setMode('Add');
    }

    //* Handle Edit
    const handleEdit = (data) => {
        setInputFieldDetail({ title: data?.title, id: data?.id });
        setMode('Edit');
    }

    //! Handle Submit : Create | Edit
    const handleSubmit = () => {
        console.log({ ...inputFieldDetail });

        if (mode == 'Edit') {
            handleReset()
            const payload = {
                id: inputFieldDetail?.id,
                data: {
                    title: inputFieldDetail?.name,
                },
                onComplete: () => handleReset()
            }

            //! Dispatching API For Update Support Category
            // dispatch(MasterActions.updateSaleArea(payload));

        } else {
            const payload = {
                data: {
                    title: inputFieldDetail?.title,
                },
                onComplete: () => handleReset()
            }
            console.log('Payload ::', payload);

            //! Dispatching API For Create Support Category
            // dispatch(MasterActions.createSaleArea(payload));
        }
    }

    //* Datatable Columns
    const columns = [
        { name: 'S.No.', selector: row => supportSubCategoryData?.indexOf(row) + 1 },
        { name: 'Title', selector: row => row?.title },
        {
            name: 'Action',
            cell: row => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <div onClick={() => handleEdit(row)} style={{ cursor: "pointer" }}><EditSvg /></div>
                    <div onClick={() => dispatch(MasterActions.deleteSaleArea({ id: row?.id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
                </div>
            ),
            right: true
        },
    ];

    useEffect(() => {
        //! Dispatching API For Getting Support Category
        dispatch(MasterActions.getSaleArea());
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <RouteHeader title={'Support'} />

            <div style={{ backgroundColor: Color.white, padding: "20px", borderRadius: "10px" }}>
                <Grid container spacing={2} sx={{ marginBottom: "40px", alignItems: "center" }}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <TextField label="Title" variant="outlined" fullWidth
                            name="title"
                            value={inputFieldDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "flex-end" }}>
                            <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 20px", borderRadius: "30px", cursor: "pointer", fontSize: "15px" }}>{mode}</div>
                        </Grid>
                    </Grid>
                </Grid>

                <div style={{ backgroundColor: Color.white, padding: "20px", borderRadius: "10px", boxShadow: "1px 1px 5px grey" }}>
                    <DatatableHeading title={'Sub Category'} data={supportSubCategoryData} />
                    <DatatableWithSearch data={supportSubCategoryData} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default SubCategory;