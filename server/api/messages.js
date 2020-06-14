const router = require('express').Router()
const {Message, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      include: [User]
    })
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const message = await Message.create({...req.body, userId: req.user.id})
    const newMessage = await Message.findOne({
      where: {id: message.id},
      include: [{model: User}]
    })
    res.send(newMessage)
  } catch (error) {
    next(error)
  }
})
