import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [search, setSearch] = useState('');
    const { userEmail, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/emp/employees', {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Failed to fetch employees:', error.response?.data || error.message);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/emp/employees/${id}`, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setSuccess('Employee deleted successfully');
            await fetchEmployees();
        } catch (error) {
            console.error('Failed to delete employee:', error.response?.data || error.message);
            setErrors({ general: 'Failed to delete employee.' });
        }
    };

    const updateEmployee = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/v1/emp/employees/${selectedEmployee._id}`,
                selectedEmployee,
                {
                    headers: { Authorization: localStorage.getItem('token') },
                }
            );
            setSuccess('Employee updated successfully');
            setSelectedEmployee(null);
            setErrors({});
            await fetchEmployees();
        } catch (error) {
            if (error.response?.data?.errors) {
                const fieldErrors = {};
                error.response.data.errors.forEach((err) => {
                    fieldErrors[err.param] = err.msg;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ general: error.response?.data?.message || 'Failed to update employee.' });
            }
        }
    };

    const cancelEdit = () => {
        setSelectedEmployee(null);
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedEmployee({ ...selectedEmployee, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(
        (emp) =>
            emp.department.toLowerCase().includes(search.toLowerCase()) ||
            emp.position.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Employee List</h2>
                <div style={styles.userInfo}>
                    <p>
                        Logged in as: <strong>{userEmail}</strong>
                    </p>
                    <button style={styles.logoutButton} onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            {success && <p style={styles.successMessage}>{success}</p>}
            {errors.general && <p style={styles.errorMessage}>{errors.general}</p>}

            <div style={styles.actions}>
                <input
                    type="text"
                    placeholder="Search by department or position"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
                <button style={styles.createButton} onClick={() => navigate('/create-employee')}>
                    Create Employee
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Position</th>
                    <th style={styles.th}>Department</th>
                    <th style={styles.th}>Salary</th>
                    <th style={styles.th}>Date of Joining</th>
                    <th style={styles.th}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployees.map((employee) =>
                    selectedEmployee?._id === employee._id ? (
                        <tr key={employee._id}>
                            <td style={styles.td}>
                                <div style={styles.editRow}>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={selectedEmployee.first_name}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={selectedEmployee.last_name}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                                {errors.first_name && <p style={styles.errorMessage}>{errors.first_name}</p>}
                                {errors.last_name && <p style={styles.errorMessage}>{errors.last_name}</p>}
                            </td>
                            <td style={styles.td}>
                                <input
                                    type="email"
                                    name="email"
                                    value={selectedEmployee.email}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                                {errors.email && <p style={styles.errorMessage}>{errors.email}</p>}
                            </td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    name="position"
                                    value={selectedEmployee.position}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                                {errors.position && <p style={styles.errorMessage}>{errors.position}</p>}
                            </td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    name="department"
                                    value={selectedEmployee.department}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                                {errors.department && <p style={styles.errorMessage}>{errors.department}</p>}
                            </td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    name="salary"
                                    value={selectedEmployee.salary}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                                {errors.salary && <p style={styles.errorMessage}>{errors.salary}</p>}
                            </td>
                            <td style={styles.td}>
                                {new Date(employee.date_of_joining).toLocaleDateString()}
                            </td>
                            <td style={styles.td}>
                                <button style={styles.saveButton} onClick={updateEmployee}>
                                    Save Changes
                                </button>
                                <button style={styles.cancelButton} onClick={cancelEdit}>
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={employee._id}>
                            <td style={styles.td}>{`${employee.first_name} ${employee.last_name}`}</td>
                            <td style={styles.td}>{employee.email}</td>
                            <td style={styles.td}>{employee.position}</td>
                            <td style={styles.td}>{employee.department}</td>
                            <td style={styles.td}>{employee.salary}</td>
                            <td style={styles.td}>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                            <td style={styles.td}>
                                <button
                                    style={styles.updateButton}
                                    onClick={() => setSelectedEmployee(employee)}
                                >
                                    Update
                                </button>
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => deleteEmployee(employee._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
    },
    title: {
        margin: 0,
        fontSize: '1.5rem'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    logoutButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    successMessage: {
        color: 'green'
    },
    errorMessage: {
        color: 'red'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    searchInput: {
        padding: '0.5rem',
        width: '50%',
        border: '1px solid #ccc',
        borderRadius: '4px'
    },
    createButton: {
        padding: '0.5rem 1rem',
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        textAlign: 'left',
        borderBottom: '2px solid #ccc',
        padding: '0.5rem',
        width: '14%'
    },
    td: {
        textAlign: 'left',
        padding: '0.5rem',
        borderBottom: '1px solid #ddd',
        width: '14%'
    },
    editRow: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
    },
    input: {
        width: '90%',
        padding: '0.25rem',
        fontSize: '0.9rem'
    },
    saveButton: {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    cancelButton: {
        backgroundColor: 'gray',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    updateButton: {
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default EmployeeList;