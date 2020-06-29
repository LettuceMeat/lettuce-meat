/* eslint-disable complexity */
require('dotenv').config()
const router = require('express').Router()
const {Preference, Room, User} = require('../db/models')
const socket = require('../socket')
const {yelpKey} = require('../../secrets')
const apiKey = process.env.YELP_API_KEY || yelpKey
const axios = require('axios')
module.exports = router

router.post('/:roomId/:userId', async (req, res, next) => {
  try {
    const checkPreference = await Preference.findAll({
      where: {roomName: req.params.roomId,
        userId: req.user.id
      }
    })
    if (checkPreference.length) console.log('already submit')
    else {
      const newPreference = await Preference.create({
        cuisine: req.body.preference.cuisine,
        moneys: req.body.preference.moneys,
        roomName: req.params.roomId,
        userId: req.user.id,
      })
    }

    const roomUsers = await User.findAll({where: {roomName: req.params.roomId}})
    const roomPreferences = await Preference.findAll({
      where: {roomName: req.params.roomId},
      raw: true
    })

    if (roomUsers.length === roomPreferences.length) {

      const prefsData = roomPreferences.reduce((accum, curr) => {
        if (!accum.categories.includes(curr.cuisine)) accum.categories.push(curr.cuisine)
        if (!accum.price.includes(curr.moneys)) accum.price.push(curr.moneys)
        return accum
      }, {categories: [], price: []})

      const categories = prefsData.categories.join(',')
      const price = prefsData.price.join(',')

      try {
        const output = await axios.get(
          `https://api.yelp.com/v3/businesses/search`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`
            },
            params: {
              limit: 10,
              categories: categories,
              latitude: req.body.preference.center.lat,
              longitude: req.body.preference.center.lng,
              radius: 1500,
              price: price
            }
          }
        )
        if (socket.getIO()) {
          socket
            .getIO()
            .to(req.params.roomId)
            .emit('resultsReceive', output.data.businesses)
        }
      } catch (ex) {
        next(ex)
      }

    }
    else console.log('need more votes')

  } catch (ex) {
    next(ex)
  }
})
