const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4, ENUM} = Sequelize
const db = require('../db')

const Preference = db.define('preference', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  cuisine: {
    type: STRING,
    notEmpty: true
  },
  moneys: {
    type: ENUM('$', '$$', '$$$', '$$$$')
  }
})

module.exports = Preference
