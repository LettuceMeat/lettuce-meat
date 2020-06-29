const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4, INTEGER} = Sequelize
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
    type: STRING
  }
})

module.exports = Preference
