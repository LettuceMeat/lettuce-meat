require('dotenv').config()
const router = require('express').Router()
const {Preference, Room, User} = require('../db/models/preference')
const socket = require('../socket')
const {yelpKey} = require('../../secrets')
const apiKey = process.env.YELP_API_KEY || yelpKey
const axios = require('axios')
module.exports = router

router.post('/:roomId/:userId', async (req, res, next) => {
  try {
    const roomUsers = await User.findAll({where: {roomName: req.params.roomId}})
    const roomPreferences = await Preference.findAll({
      where: {roomName: req.params.roomId}
    })
    //If true call yelp api
    //else preferences passed in will be stored in DB,
  } catch (ex) {
    next(ex)
  }
})
