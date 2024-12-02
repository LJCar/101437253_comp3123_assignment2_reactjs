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
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/employees', getAllEmployees);
router.post('/employees', validate(employeeCreationValidation), createEmployee);
router.get('/employees/:id', getEmployeeById);
router.put('/employees/:id', validate(employeeCreationValidation), updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;