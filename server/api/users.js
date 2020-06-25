const router = require('express').Router()
const {User} = require('../db/models')
const socket = require('../socket')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:roomId', async (req, res, next) => {
  const roomUsers = await User.findAll({
    where: {roomName: req.params.roomId},
  })
  res.json(roomUsers)
})

router.put('/room/:userId/:roomId', async (req, res, next) => {
  console.log('room put', req.params)
  const user = await User.findByPk(req.params.userId)
  await user.update({roomName: req.params.roomId})
  if (socket.getIO()) {
    socket
      .getIO()
      .to(req.params.roomId)
      .emit('roomUserReceive', user)
  }
  res.json(user)
})

router.put('/initialize/:userId/:roomId', async (req, res, next) => {
  const randLat = (Math.random() * 0.03)
  const randLng = (Math.random() * 0.03)
  const randLatneg = (Math.random() * 0.03)
  const randLngneg = (Math.random() * 0.03)

  const lat = req.body.lat + randLat - randLatneg
  const lng = req.body.lng + randLng - randLngneg
  
  const user = await User.findByPk(req.params.userId)
  await user.update({
    roomName: req.params.roomId,
    lat: lat,
    lng: lng
  })
  if (socket.getIO()) {
    socket
      .getIO()
      .to(req.params.roomId)
      .emit('roomUserReceive', user)
  }
  res.json(user)
})

router.put('/location/:userId', async (req, res, next) => {
  console.log('location put')
  const randLat = (Math.random() * 0.03)
  const randLng = (Math.random() * 0.03)
  const randLatneg = (Math.random() * 0.03)
  const randLngneg = (Math.random() * 0.03)
  const lat = req.body.lat + randLat - randLatneg
  const lng = req.body.lng + randLng - randLngneg
  const user = await User.findByPk(req.params.userId)
  await user.update({
    lat: lat,
    lng: lng
  })
  if (socket.getIO()) {
    socket
      .getIO()
      .to(req.params.roomId)
      .emit('roomLocationReceive', user)
  }
  res.json(user)
})
