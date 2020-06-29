const Restaurant = require('./restaurant')
const User = require('./user')
const Preference = require('./preference')
const Message = require('./message')
const Room = require('./room')

User.belongsTo(Room)
Room.hasMany(User)

Message.belongsTo(User)
User.hasMany(Message)

Message.belongsTo(Room)
Room.hasMany(Message)

Preference.belongsTo(User)
User.hasMany(Preference)

Preference.belongsTo(Room)
Room.hasMany(Preference)

module.exports = {
  User,
  Restaurant,
  Preference,
  Message,
  Room
}
