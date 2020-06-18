const router = require('express').Router()
const {Message, User, Room} = require('../db/models')
const socket = require('../socket')
module.exports = router

router.get('/:roomId', async (req, res, next) => {
  if (!rooms[req.params.roomId])
    console.log('is not a valid room!!!! redirect back')
  else console.log('is a valid room redirect to room')
})

router.post('/:roomId', async (req, res, next) => {
  try {
    const newRoom = await Room.create({name: req.params.roomId})
  } catch (error) {
    next(error)
  }
})
