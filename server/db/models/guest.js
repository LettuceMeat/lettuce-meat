const Sequelize = require('sequelize')
const {UUID, UUIDV4, STRING, DECIMAL} = Sequelize
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Guest = db.define('guest', {
  id: uuidDef,
  name: {
    type: STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  lat: {
    type: DECIMAL
  },
  lng: {
    type: DECIMAL
  }
})

module.exports = Guest
