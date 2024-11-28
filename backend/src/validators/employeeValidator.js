const { body } = require('express-validator');

const employeeCreationValidation = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('date_of_joining').isISO8601().withMessage('Invalid date format'),
    body('department').notEmpty().withMessage('Department is required'),
];

module.exports = { employeeCreationValidation };
