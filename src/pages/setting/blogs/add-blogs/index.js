import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Grid, TextField } from '@mui/material';
import RichTextEditor from 'react-rte';
import { Color } from '../../../../assets/color';
import RouteHeader from '../../../../components/common/RouteHeader';
import Logo from '../../../../assets/images/logo_icon.png';

const AddBlog = ({ mode }) => {
    const location = useLocation();
    const stateData = location.state && location.state.stateData;

    const [inputFieldDetail, setInputFieldDetail] = useState({ blogTitle: '', authorName: '' });
    const [description, setDescription] = useState(stateData ? RichTextEditor.createValueFromString(stateData?.description, 'html') : RichTextEditor.createEmptyValue());
    const [inputFieldError, setInputFieldError] = useState({});
    const [image, setImage] = useState({ file: '', bytes: '' });

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //! Handle Image
    const handleImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setImage({ file: base64String, bytes: file });
            };
        }

        handleInputFieldError("image", null);
    };

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { blogTitle, authorName } = inputFieldDetail;
        if (!blogTitle) {
            handleInputFieldError("blogTitle", "Please Enter Blog Title")
            isValid = false;
        }
        if (!authorName) {
            handleInputFieldError("authorName", "Please Enter Author Name")
            isValid = false;
        }
        if (!image?.file) {
            handleInputFieldError("image", "Please Select Image")
            isValid = false;
        }
        if (description?.toString('html') == "<p><br></p>") {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ ...inputFieldDetail, description: description?.toString('html'), image })

        if (handleValidation()) {
            if (stateData) {
                const payload = { announcementId: stateData?._id, description: description?.toString('html') };

                //! Dispatching API for Update Blogs

            } else {
                const payload = { description: description?.toString('html') };

                //! Dispatching API for Creating Blogs
            }
        }
    };

    return (
        <div style={{ padding: "10px" }}>
            <RouteHeader title={`Blogs / ${mode} Blog`} />

            <div style={{ backgroundColor: Color.white, padding: "20px", borderRadius: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12} sx={{ fontWeight: "600", fontSize: "20px", marginBottom: "20px" }}>{mode} Blog</Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label="Blog Title" variant='outlined' fullWidth
                            name='blogTitle'
                            value={inputFieldDetail?.blogTitle}
                            onChange={handleInputField}
                            error={inputFieldError.blogTitle ? true : false}
                            helperText={inputFieldError.blogTitle}
                            onFocus={() => handleInputFieldError("blogTitle", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div style={{ border: `1px solid ${Color.borderColor}`, padding: "2px 12px", borderRadius: "3px", display: 'flex', alignItems: "center", gap: '20px' }}>
                            <img src={image?.file ? `data:image/png;base64, ${image?.file}` : Logo} height={'50px'} width={'50px'} />
                            <label htmlFor='choose_image' style={{ cursor: "pointer", border: `1px dashed ${Color.greyBg}`, flex: 1, padding: "7px 10px", borderRadius: "5px", fontWeight: "500", fontSize: "17px", textAlign: "center" }}>Choose Image</label>
                            <input id='choose_image' type='file' hidden onChange={handleImage} accept="image/*" />
                        </div>
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "10px", padding: "10px 0 0 15px" }}>{inputFieldError?.image}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label="Author Name" variant='outlined' fullWidth
                            name='authorName'
                            value={inputFieldDetail?.authorName}
                            onChange={handleInputField}
                            error={inputFieldError.authorName ? true : false}
                            helperText={inputFieldError.authorName}
                            onFocus={() => handleInputFieldError("authorName", null)}
                        />
                    </Grid>

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

export default AddBlog;