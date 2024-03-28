import React from 'react';
import {render, fireEvent, waitFor, getByTestId} from '@testing-library/react';
import Login from '../components/Login/Login.jsx';
import '@testing-library/jest-dom'

describe('Login Component', () => {
    function renderLogin() {
        return render(<Login />);
    }

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
        const { getByLabelText, getByText } = renderLogin();

        setFetch(true)

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'admin' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'adminpass' } });

        fireEvent.click(getByText(/submit/i));

        await waitFor(() => expect(getByLabelText(/pin/i)).toBeInTheDocument());
    });

    // UAT 2
    test('Admin user enters correct username, password and verification code', async () => {
        const { getByLabelText, getByText } = renderLogin();

        setFetch(true)

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'admin' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'adminpass' } });

        fireEvent.click(getByText(/submit/i));

        await waitFor(() => expect(getByLabelText(/pin/i)).toBeInTheDocument());

        // Simulate receiving and entering the SMS verification code
        setFetch(true, {
            verified: true,
            smsStatus: "MESSAGE_SENT"
        })

        fireEvent.change(getByLabelText(/pin/i), { target: { value: '123456' } });
        fireEvent.click(getByText(/submit/i));

        await waitFor(() => expect(window.location.href).toContain('/home'));
    });

    // UAT 3
    test('Admin user enters incorrect username or password', async () => {
        const { getByLabelText, getByText } = renderLogin();

        setFetch(false)

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'wrongadmin' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'wrongpass' } });

        fireEvent.click(getByText(/submit/i));

        // Check for the error message
        await waitFor(() => expect(getByTestId('error-message')).toHaveTextContent('Invalid credentials'));
    });

    // UAT 4
    test('Admin user enters correct username, password but incorrect verification code', async () => {
        const { getByLabelText, getByText } = renderLogin();

        setFetch(true)

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'admin' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'adminpass' } });

        fireEvent.click(getByText(/submit/i));

        // Simulate receiving and entering the incorrect SMS verification code
        setFetch(true, {
            verified: false,
            smsStatus: "MESSAGE_SENT"
        })

        fireEvent.change(getByLabelText(/pin/i), { target: { value: '123456' } });
        fireEvent.click(getByText(/submit/i));

        // Check for the error message
        await waitFor(() => expect(getByTestId('error-message')).toHaveTextContent('Incorrect verification code'));
    });
})