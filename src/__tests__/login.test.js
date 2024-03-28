import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login/Login.jsx';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";

describe('Login Component', () => {
    function setFetch(state, body = {}) {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(body),
                ok: state
            })
        );
    }

    afterEach(() => {
        jest.clearAllMocks();
    })

    // UAT 1
    test('Admin user enters correct username and password', async () => {
        const { getByPlaceholderText, getAllByText } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        setFetch(true)

        fireEvent.change(getByPlaceholderText(/username/i), { target: { value: 'admin' } });
        fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'adminpass' } });

        fireEvent.click(getAllByText(/login/i)[1]);

        await waitFor(() => expect(getByPlaceholderText(/pin/i)).toBeInTheDocument());
    });

    // UAT 2
    test('Admin user enters correct username, password and verification code', async () => {
        const { getByPlaceholderText, getAllByText } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        setFetch(true)

        fireEvent.change(getByPlaceholderText(/username/i), { target: { value: 'admin' } });
        fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'adminpass' } });

        fireEvent.click(getAllByText(/login/i)[1]);

        await waitFor(() => expect(getByPlaceholderText(/pin/i)).toBeInTheDocument());

        // Simulate receiving and entering the SMS verification code
        setFetch(true, {
            verified: true,
            smsStatus: "MESSAGE_SENT"
        })

        fireEvent.change(getByPlaceholderText(/pin/i), { target: { value: '123456' } });
        fireEvent.click(getAllByText(/submit/i)[0]);

        await waitFor(() => expect(window.location.href).toContain('/home'));
    });

    // UAT 3
    test('Admin user enters incorrect username or password', async () => {
        const { getByPlaceholderText, getAllByText } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        setFetch(false, { message: 'User not found.'})

        fireEvent.change(getByPlaceholderText(/username/i), { target: { value: 'wrongadmin' } });
        fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'wrongpass' } });

        fireEvent.click(getAllByText(/login/i)[1]);

        // Check for the error message
        await waitFor(() => expect(getAllByText(/user not found/i)[0]).toBeInTheDocument());
    });

    // UAT 4
    test('Admin user enters correct username, password but incorrect verification code', async () => {
        const { getByPlaceholderText, getAllByText } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        setFetch(true)

        fireEvent.change(getByPlaceholderText(/username/i), { target: { value: 'admin' } });
        fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'adminpass' } });

        fireEvent.click(getAllByText(/login/i)[1]);

        // Simulate receiving and entering the incorrect SMS verification code
        setFetch(true, {
            verified: false,
            smsStatus: "MESSAGE_SENT"
        })

        await waitFor(() => expect(getByPlaceholderText(/pin/i)).toBeInTheDocument());

        fireEvent.change(getByPlaceholderText(/pin/i), { target: { value: '123456' } });
        fireEvent.click(getAllByText(/submit/i)[0]);

        // Check for the error message
        await waitFor(() => expect(getAllByText(/invalid/i)[0]).toBeInTheDocument());
    });
})