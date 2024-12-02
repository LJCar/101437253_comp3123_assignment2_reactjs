const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id, {...req.body, updated_at: new Date()},
            { new: true }
        );

        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });

        res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee };