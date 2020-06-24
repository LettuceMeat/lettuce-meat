const router = require('express').Router()
const {Message, User, Room} = require('../db/models')
const socket = require('../socket')
module.exports = router

router.get('/:roomId', async (req, res, next) => {
  const room = await Room.findAll({
    where: {name: req.params.roomId},
    include: [User, Message]
  })
  res.json(room)
})

router.post('/:roomId', async (req, res, next) => {
  try {
    const newRoom = await Room.create({name: req.params.roomId})
  } catch (error) {
    next(error)
  }
})
