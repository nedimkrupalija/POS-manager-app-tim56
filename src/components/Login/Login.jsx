import React from 'react';
import './Login.css';

import person_icon from '../../assets/person.png';
import pass_icon from '../../assets/password.png';

const Login = () => {
    const handleLogin = () => {
        const usernameOrPhone = document.getElementById('usernameOrPhone').value;
        const password = document.getElementById('password').value;

        let requestBody;
        if (isNaN(usernameOrPhone)) { 
            requestBody = { username: usernameOrPhone, password: password, role:"admin" };
        } else {
            requestBody = { phoneNumber: usernameOrPhone, password: password, role:"admin" };
        }

        fetch('http://localhost:3000/auth/login', {
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
            console.log(data); 
        })
        .catch(error => {
            console.error('Error:', error); 
            alert(error.message);
        });
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Log in</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={person_icon} alt=""/>
                    <input id="usernameOrPhone" type="text" placeholder='Username or phone number'/>
                </div> 
                <div className="input">
                    <img src={pass_icon} alt=""/>
                    <input id="password" type="password" placeholder='Password'/>
                </div> 
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handleLogin}>Login</div>
            </div>
        </div>
    );
};

export default Login;
