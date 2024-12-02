import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../authentication/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/login', credentials);
            login(response.data.token);
            navigate('/employees');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Login failed. Please try again.');
            } else {
                setError('Something went wrong. Please try again later.');
                console.error('Login error:', error.message);
            }
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.header}>Login to Employee Manager</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="text"
                    name="identifier"
                    placeholder="Username or Email"
                    value={credentials.identifier}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>

            <p style={styles.signupText}>
                Don't have an account?
                <button
                    onClick={() => navigate('/signup')}
                    style={styles.signupButton}
                >
                    Sign up here
                </button>
            </p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    },
    header: {
        marginBottom: '1rem',
        fontSize: '1.5rem'
    },
    error: {
        color: 'red',
        marginBottom: '1rem'
    },
    input: {
        width: '100%',
        maxWidth: '300px',
        padding: '0.5rem',
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem'
    },
    button: {
        width: '100%',
        maxWidth: '300px',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    signupText: {
        marginTop: '1rem',
        fontSize: '0.9rem',
        color: '#555'
    },
    signupButton: {
        background: 'none',
        border: 'none',
        color: '#007bff',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
};

export default Login;