const router = require('express').Router()
const {Message, User} = require('../db/models')
const socket = require('../socket')
const rooms = require('../rooms')
module.exports = router

router.get('/:roomId', async (req, res, next) => {
  // socket.getIO() && socket.getIO().to('testRoom').emit('testing', {})
  // socket.getIO().join('testRoom')
  console.log(req.params.roomId)
  if (!rooms[req.params.roomId]) console.log('is not a valid room!!!!')
  else console.log('is a valid room')
})
