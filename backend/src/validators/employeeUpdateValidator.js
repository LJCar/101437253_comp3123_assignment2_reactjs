const { body } = require('express-validator');

const employeeUpdateValidation = [
    body('first_name').optional().notEmpty().withMessage('First name is required'),
    body('last_name').optional().notEmpty().withMessage('Last name is required'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('position').optional().notEmpty().withMessage('Position is required'),
    body('department').optional().notEmpty().withMessage('Department is required'),
    body('salary').optional().isNumeric().withMessage('Salary must be a number'),

];

module.exports = { employeeUpdateValidation };