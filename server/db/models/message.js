const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4, INTEGER, TEXT} = Sequelize
const db = require('../db')

const Message = db.define('message', {
  //maybe we also need to add the room ID here? or add it as an association
  //also add an author ID
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  content: {
    type: TEXT,
    notEmpty: true
  }
})

module.exports = Message
