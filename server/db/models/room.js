const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, DECIMAL, UUID, UUIDV4} = Sequelize

const Room = db.define('room', {
  name: {
    primaryKey: true,
    type: STRING,
    allowNull: false,
    unique: true
  },
  lat: {
    type: DECIMAL
  },
  lng: {
    type: DECIMAL
  }
})

module.exports = Room

// is: /^[A-Z]+$/i
