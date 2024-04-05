import React, { useState, useEffect } from 'react';
import './Login.css';
import Cookies from 'js-cookie';
import person_icon from '../../assets/person.png';
import pass_icon from '../../assets/password.png';
import error_icon from '../../assets/error.png';
import Home from '../Home/Home';

import info_icon from '../../assets/info.png'

const Login = () => {
    const [usernameOrPhone, setUsernameOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [pinInputVisible, setPinInputVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pinId, setPinId] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [pin, setPin] = useState('');
    const [token, setToken] = useState('');

    const URL_LOGIN = 'https://pos-app-backend-tim56.onrender.com/auth/login';
    const URL_SEND_PIN = 'https://j3m2qv.api.infobip.com/2fa/2/pin';
    const URL_VERIFY_PIN = `https://j3m2qv.api.infobip.com/2fa/2/pin/${pinId}/verify`;

    const ROLE = 'admin';
    const APPLICATION_ID = '546038714E147223CEAFE8ABCBCAC509';
    const MESSAGE_ID = 'BA5DB6F8166D0FCEE29442F0D955EAD9';

    const handleLogin = () => {
        const requestBody = isNaN(usernameOrPhone)
            ? { username: usernameOrPhone, password: password, role: ROLE }
            : { phoneNumber: usernameOrPhone, password: password, role: ROLE };

        fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .then(data => {
                setToken(data.token);
                sendPinRequest(data.phoneNumber)
                setErrorMessage('')
            })
            .catch(error => {
                setErrorMessage(error.message)
            });
    };


    const sendPinRequest = (phoneNumber) => {
        if (phoneNumber.charAt(0) != '3') {
            phoneNumber = phoneNumber.substring(1);
            phoneNumber = "387" + phoneNumber
        }
        const pinRequestBody = {
            applicationId: APPLICATION_ID,
            messageId: MESSAGE_ID,
            to: phoneNumber
        };

        fetch(URL_SEND_PIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'App ba166729a00e8688d267140a5cf88cdc-375d7dee-0197-40a4-9f66-cc2611a6a2da'
            },
            body: JSON.stringify(pinRequestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Data ", data)
                if (data.smsStatus === "MESSAGE_SENT") {
                    setPinInputVisible(true);
                    setPinId(data.pinId);
                    setMessage('PIN sent successfully. Please check your SMS for the PIN.');
                } else {
                    setPinInputVisible(true);
                    setPinId('')
                    setMessage('Message not sent. Please try again.');
                }
            })
            .catch(error => {
                setErrorMessage(error.message)
            });
    };

    const handleResendPin = () => {
        setMessage('');
        sendPinRequest();
    };
    const handleManagerApp = () => {
        Cookies.remove('jwt');
        window.location.href = "https://pos-client-app-tim56.vercel.app/";
    }
    const verifyPin = () => {
        const pinRequestBody = {
            pin: pin
        };

        fetch(URL_VERIFY_PIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'App ba166729a00e8688d267140a5cf88cdc-375d7dee-0197-40a4-9f66-cc2611a6a2da'
            },
            body: JSON.stringify(pinRequestBody)
        })
            .then(response => response.json())
            .then(data => {
                if (data.verified === undefined || data.verified == false) {
                    setMessage('Invalid PIN. Please try again.');
                } else {
                    
                    setPinInputVisible(false);
                    setMessage('');
               
                    Cookies.set('jwt', token, { expires: 1/48, path: '/' });
                    setIsLoggedIn(true);
                }
            })
            .catch(error => {
                setErrorMessage(error.message)
            });
    };
    if (isLoggedIn) {
        return <Home />;
    }
    return (
        <div className="container">
            <div className="header">

                <div className="text">Login</div>

                <div className="underline"></div>
            </div>
            {errorMessage && <div className="error-message">
                <img src={error_icon} alt='error' className='error-icon' />
                <span>{errorMessage}</span>
            </div>}
            <div className="inputs">
                <div className="input">
                    <img src={person_icon} alt="" />
                    <input
                        id="usernameOrPhone"
                        type="text"
                        placeholder='Username or phone number'
                        value={usernameOrPhone}
                        onChange={(e) => setUsernameOrPhone(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={pass_icon} alt="" />
                    <input
                        id="password"
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handleLogin}>Log in</div>
            </div>
            <div className='admin'>
                <span onClick={handleManagerApp}>Log in as client </span>
            </div>
            {pinInputVisible && (
                <div className="pin-input-container">
                    <input
                        className="pin-input-field"
                        type="text"

                        placeholder="Enter PIN"

                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                    <button className="submit-pin" onClick={verifyPin}>Submit</button>
                </div>
            )}
            {message && message.includes('PIN sent successfully. Please check your SMS for the PIN') && (
                <div className="info-message">
                    <img src={info_icon} alt='info' className='info-icon' />
                    <span>{message}</span>
                </div>
            )}
            {message && message.includes('Message not sent') && (
                <>
                    <div className="error-message">
                        <img src={error_icon} alt='error' className='error-icon' />
                        <span>{message}</span>
                        <button className="resend-pin-button" onClick={handleResendPin}>Resend PIN</button>
                    </div>
                </>
            )}
            {message && message.includes('Invalid PIN. Please try again') && (
                <>
                    <div className="error-message">
                        <img src={error_icon} alt='error' className='error-icon' />
                        <span>{message}</span>
                    </div>
                </>
            )}
        </div>
    );
};


export default Login;