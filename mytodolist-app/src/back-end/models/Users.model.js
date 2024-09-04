const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // configure your sequelize connection

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true 
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true 
  },
}, {
  timestamps: true, 
});

module.exports = User;
