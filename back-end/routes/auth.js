const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const { JWT_SECRET } = process.env;

// Registration Route

router.post('/register', async (req, res) => {
    const { name,email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name,email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email:email });
        if (!user) return res.status(400).json({ message: 'User not found' })
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log("here")
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
