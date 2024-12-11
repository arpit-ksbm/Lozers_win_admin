import React, { useState } from 'react';
import { Grid } from '@mui/material';
import RichTextEditor from 'react-rte';
import { Color } from '../../../assets/color';
import RouteHeader from '../../../components/common/RouteHeader';
import axios from 'axios';

const PrivacyPolicy = () => {
    const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
    const [inputFieldError, setInputFieldError] = useState({ description: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        // e.preventDefault();

        if (handleValidation()) {
            setIsLoading(true);
            const payload = {
                description: description.toString('html') 
            };
            console.log('Submitting payload:', payload);

            try {
                const response = await axios.post('http://localhost:4000/api/setting/privacyPolicy', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response Data:', response.data);
            } catch (error) {
                console.error('Failed to save Privacy Policy:', error.response ? error.response.data : error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleValidation = () => {
        let isValid = true;

        if (description?.toString('html').trim() === "") {
            setInputFieldError({ description: "Please Enter Description" });
            isValid = false;
        } else {
            setInputFieldError({ description: '' });
        }

        return isValid;
    };

    return (
        <div style={{ padding: "10px" }}>
            <RouteHeader title={'Privacy Policy'} />
            <div style={{ backgroundColor: Color.white, padding: "20px", borderRadius: "10px" }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} sm={12} md={12} xs={12} sx={{ fontWeight: "600", fontSize: "20px", marginBottom: "20px" }}>Privacy Policy</Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <RichTextEditor
                                value={description}
                                onChange={(value) => {
                                    setDescription(value);
                                }}
                                editorStyle={{ minHeight: '60vh' }}
                                onFocus={() => setInputFieldError({ description: '' })}
                            />
                            {inputFieldError?.description && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "400" }}>{inputFieldError?.description}</div>}
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container sx={{ justifyContent: "space-between" }}>
                                <button
                                    type="submit"
                                    style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px", border: "none" }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
