const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'COMP3123_secret_key';

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Username already taken' });

        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const login = async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '3h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { signup, login };