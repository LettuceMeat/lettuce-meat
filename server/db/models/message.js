const socket = require('../../socket')
const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4, INTEGER, TEXT} = Sequelize
const db = require('../db')

const Message = db.define(
  'message',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    content: {
      type: TEXT,
      notEmpty: true
    }
  },
  {
    hooks: {
      afterCreate: function(message) {
        return message
          .reload({
            include: [db.models.user]
          })
          .then(message => {
            if (socket.getIO()) {
              socket.getIO().emit('message', message)
            }
          })
      }
    }
  }
)

module.exports = Message
