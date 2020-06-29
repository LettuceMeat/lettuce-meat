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
    let newRoom = await Room.findAll({
      where: {name: req.params.roomId},
    })
    if (newRoom.length === 0) await Room.create({name: req.params.roomId})
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.get('/:roomId/restaurants', async (req, res, next) => {
  try {
    let roomRes = await Room.findAll({
      where: {name: req.params.roomId}
    })
    // const [apiSearch] = findRestaurants()
    // console.log(apiSearch)
    // get room preferences array
    // get room price array
    // restaurants = yelpSearch(preferences, price)
    // res.send(restaurants)
    res.json(roomRes)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})
