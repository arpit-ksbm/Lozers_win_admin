import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import RichTextEditor from 'react-rte';
import { Color } from '../../../assets/color';
import RouteHeader from '../../../components/common/RouteHeader';
import axios from 'axios'

const TermsAndConditions = () => {
    const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
    const [inputFieldError, setInputFieldError] = useState({ title: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;

        if (description?.toString('html') == "<p><br></p>") {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit
    const handleSubmit = async (e) => {
        // e.preventDefault();
        console.log({ description: description?.toString('html') })

        if (handleValidation()) {
            const payload = {
                description: description.toString('html') 
            };
            console.log('Submitting payload:', payload);

            try {
                const response = await axios.post('http://localhost:4000/api/setting/TermsAndConditons', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response Data:', response.data);
            } catch (error) {
                console.error('Failed to save Privacy Policy:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <div style={{ padding: "10px" }}>
            <RouteHeader title={'Terms & Conditions'} />

            <div style={{ backgroundColor: Color.white, padding: "20px", borderRadius: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12} sx={{ fontWeight: "600", fontSize: "20px", marginBottom: "20px" }}>Terms & Conditions</Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <RichTextEditor
                            value={description}
                            onChange={setDescription}
                            editorStyle={{ minHeight: '50vh', }}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
                        {inputFieldError?.description && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "400" }}>{inputFieldError?.description}</div>}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default TermsAndConditions;