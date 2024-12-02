import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess(false);

        try {
            await axios.post('http://localhost:8080/api/v1/user/signup', user);
            setSuccess(true);
            setTimeout(() => navigate('/'), 3000);
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const fieldErrors = {};
                error.response.data.errors.forEach((err) => {
                    fieldErrors[err.param] = err.msg;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ general: 'Something went wrong. Please try again later.' });
                console.error('Signup error:', error.message);
            }
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.header}>Signup</h2>

                {success && <p style={styles.success}>Signup successful! Redirecting to login...</p>}
                {errors.general && <p style={styles.error}>{errors.general}</p>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                {errors.username && <p style={styles.error}>{errors.username}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                {errors.email && <p style={styles.error}>{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                {errors.password && <p style={styles.error}>{errors.password}</p>}

                <button type="submit" style={styles.button}>Signup</button>
            </form>

            <p style={styles.loginText}>
                Already have an account?
                <button
                    onClick={() => navigate('/')}
                    style={styles.loginButton}
                >
                    Login here
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
    success: {
        color: 'green',
        marginBottom: '1rem'
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
    loginText: {
        marginTop: '1rem',
        fontSize: '0.9rem',
        color: '#555'
    },
    loginButton: {
        background: 'none',
        border: 'none',
        color: '#007bff',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
};

export default Signup;