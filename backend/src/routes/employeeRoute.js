const express = require('express');
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController');
const { employeeCreationValidation } = require('../validators/employeeValidator');
const { validate } = require('../middleware/validationMiddleware');

const router = express.Router();

// Routes
router.get('/employees', getAllEmployees); // No validation needed for GET
router.post('/employees', validate(employeeCreationValidation), createEmployee);
router.get('/employees/:id', getEmployeeById); // Add validation if needed
router.put('/employees/:id', updateEmployee); // Add validation if needed
router.delete('/employees/:id', deleteEmployee); // Add validation if needed

module.exports = router;