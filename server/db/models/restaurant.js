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
  yelpId: {
    type: STRING,
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
