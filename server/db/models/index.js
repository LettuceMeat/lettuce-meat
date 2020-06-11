const User = require('./user')
const Preference = require('./preference')
const Message = require('./message')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Message.belongsTo(User)
User.hasMany(Message)

Preference.belongsTo(User)
User.hasMany(Preference)

module.exports = {
  User,
  Preference,
  Message
}
