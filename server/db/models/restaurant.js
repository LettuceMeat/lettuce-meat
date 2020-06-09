const Sequelize = require('sequelize')
const db = require('../db')
const {BOOLEAN, DATE, STRING, UUID, UUIDV4} = Sequelize

const uuidDefinition = {
  primaryKey: true,
  type: UUID,
  defaultValue: UUIDV4
}

const Restaurant = db.define('restaurant', {
  id: uuidDefinition,
  name: {
    type: STRING,
    allowNull: false
  },
  latitude: {
    type: STRING,
    allowNull: false
  },
  longitude: {
    type: STRING,
    allowNull: false
  },
  imageURL: {
    type: STRING
  },
  phone: {
    type: STRING
  },
  address: {
    type: STRING,
    allowNull: false
  },
  sponsored: {
    type: BOOLEAN,
    defaultValue: false
  },
  sponsorshipExpiration: {
    type: DATE
  }
})

module.exports = Restaurant
