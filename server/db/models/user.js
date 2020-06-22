const crypto = require('crypto')
const Sequelize = require('sequelize')
const {UUID, UUIDV4, STRING, DECIMAL} = Sequelize
const db = require('../db')

// uuid
// profile picture
// first name
// last name
// location (lat/long)
// preferences
// Messages
// isHost
const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const User = db.define('user', {
  id: uuidDef,
  email: {
    type: STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  profilePhoto: {
    type: STRING,
    defaultValue: '' //add default icon url here
  },
  userName: {
    type: STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  lat: {
    type: DECIMAL
    // allowNull: false,
    // notEmpty: true
  },
  lng: {
    type: DECIMAL
    // allowNull: false,
    // notEmpty: true
  },
  isHost: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
