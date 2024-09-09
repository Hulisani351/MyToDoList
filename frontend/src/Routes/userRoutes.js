const express = require('express');
const User = require('../models/User');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Get user data (protected route)
router.get('/me', verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

module.exports = router;
