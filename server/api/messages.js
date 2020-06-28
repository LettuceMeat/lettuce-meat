const router = require('express').Router()
const {Message, User} = require('../db/models')
module.exports = router

router.get('/:roomId', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {roomName: req.params.roomId},
      include: [User]
    })
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

router.post('/:roomId', async (req, res, next) => {
  try {
    const message = await Message.create({
      content: req.body.message,
      userId: req.user.id,
      roomName: req.params.roomId
    })
    const newMessage = await Message.findOne({
      where: {id: message.id},
      include: [{model: User}]
    })
    res.send(newMessage)
  } catch (error) {
    next(error)
  }
})

router.get('/', (req, res, next) => {
  Message.findAll({include: [User]})
    .then(message => res.send(message))
    .catch(next)
})
