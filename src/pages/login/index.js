import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box, } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../../assets/images/logo.png';
import login_background from '../../assets/images/login_background.png';
import * as AuthActions from '../../redux/actions/authAction';

// Styled component for the background
const BackgroundBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${login_background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

// Styled component for the login form container
const LoginContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: "400px"
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputFieldDetail, setInputFieldDetail] = useState({ email: '', password: '' });
    const [inputFieldError, setInputFieldError] = useState({});

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    };

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true
        const { email, password } = inputFieldDetail;

        if (!email) {
            handleInputFieldError("email", "Please Enter email")
            isValid = false;
        }
        if (!password) {
            handleInputFieldError("password", "Please Enter Password")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit
    const handleSubmit = () => {
        const { email, password } = inputFieldDetail;

        if (handleValidation()) {
            console.log({ ...inputFieldDetail });

            const payload = {
                data: { email, password },
                onComplete: () => navigate('/')
            }
            //! Dispatching API For Login
            dispatch(AuthActions.adminLogin(payload))
        } else {
            console.log({ message: 'Validation Error' })
        }
    };

    return (
        <BackgroundBox>
            <LoginContainer>
                <Box mb={4}>
                    <img src={logo} alt="Logo" style={{ width: '250px' }} />
                </Box>
                <Box style={{ width: '100%' }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <input
                            name="email"
                            value={inputFieldDetail?.email}
                            onChange={handleInputField}
                            onFocus={() => handleInputFieldError("email", null)}
                            placeholder='Email'
                            style={{ width: "100%", outline: "none", padding: "12px 10px", borderRadius: '5px' }}
                        />
                        <input
                            name='password'
                            value={inputFieldDetail?.password}
                            onChange={handleInputField}
                            onFocus={() => handleInputFieldError("password", null)}
                            placeholder='Password'
                            style={{ width: "100%", outline: "none", padding: "12px 10px", borderRadius: '5px' }}
                        />
                    </div>
                    <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" style={{ marginTop: '16px', backgroundColor:"#81BC3E" }}>
                        Sign In
                    </Button>
                </Box>
            </LoginContainer>
        </BackgroundBox>
    );
};

export default Login;