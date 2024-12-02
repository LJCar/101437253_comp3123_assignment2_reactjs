import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authentication/AuthContext';

const CreateEmployeeForm = () => {
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        department: '',
        salary: '',
        date_of_joining: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const { userEmail, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/v1/emp/employees', employee, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setSuccess('Employee created successfully');
            setErrors({});
            navigate('/employees');
        } catch (error) {
            if (error.response?.data?.errors) {
                const fieldErrors = {};
                error.response.data.errors.forEach((err) => {
                    fieldErrors[err.param] = err.msg;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ general: error.response?.data?.message || 'Failed to create employee.' });
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.backButton} onClick={() => navigate('/employees')}>
                    Back to Employees Page
                </button>
                <div style={styles.userInfo}>
                    <p style={styles.loggedInText}>
                        Logged in as: <strong>{userEmail}</strong>
                    </p>
                    <button style={styles.logoutButton} onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Create Employee</h2>
                {errors.general && <p style={styles.errorMessage}>{errors.general}</p>}
                {success && <p style={styles.successMessage}>{success}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={employee.first_name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.first_name && <p style={styles.errorMessage}>{errors.first_name}</p>}

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={employee.last_name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.last_name && <p style={styles.errorMessage}>{errors.last_name}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={employee.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.email && <p style={styles.errorMessage}>{errors.email}</p>}

                    <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={employee.position}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.position && <p style={styles.errorMessage}>{errors.position}</p>}

                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={employee.department}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.department && <p style={styles.errorMessage}>{errors.department}</p>}

                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={employee.salary}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.salary && <p style={styles.errorMessage}>{errors.salary}</p>}

                    <label htmlFor="date_of_joining" style={styles.label}>Date of Joining:</label>
                    <input
                        type="date"
                        name="date_of_joining"
                        placeholder="Date of Joining"
                        value={employee.date_of_joining}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.date_of_joining && <p style={styles.errorMessage}>{errors.date_of_joining}</p>}

                    <button type="submit" style={styles.submitButton}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: 'auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    backButton: {
        padding: '0.5rem 1rem',
        backgroundColor: 'gray',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    loggedInText: {
        margin: 0
    },
    logoutButton: {
        padding: '0.5rem 1rem',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    formWrapper: {
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    title: {
        textAlign: 'center',
        marginBottom: '1.5rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    input: {
        padding: '0.75rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%'
    },
    submitButton: {
        padding: '0.75rem',
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
    },
    errorMessage: {
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '-0.5rem',
        marginBottom: '0.5rem'
    },
    successMessage: {
        color: 'green',
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        display: 'block'
    }
};

export default CreateEmployeeForm;