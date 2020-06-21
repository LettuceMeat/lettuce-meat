require('dotenv').config()
const router = require('express').Router()
const {yelpKey} = require('../../secrets')
const apiKey = process.env.YELP_API_KEY || yelpKey
const axios = require('axios')
// const {Restaurant} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const output = await axios.get(
      `https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        },
        params: {
          limit: req.body.limit,
          categories: req.body.categories,
          latitude: req.body.latitude,
          longitutde: req.body.longitude,
          radius: req.body.radius
        }
      }
    )
    res.send(output.data.businesses)
  } catch (ex) {
    next(ex)
  }
})
