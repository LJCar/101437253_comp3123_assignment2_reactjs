const { body } = require('express-validator');

const userSignupValidation = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const userLoginValidation = [
    body('username').optional().trim(),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { userSignupValidation, userLoginValidation };