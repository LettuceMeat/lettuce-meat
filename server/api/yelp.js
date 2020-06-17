require('dotenv').config()
const {yelpKey} = require('../../secrets')
const apiKey = process.env.YELP_API_KEY || yelpKey
const axios = require('axios')

const yelp = axios.create({
  baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses`,
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
})
export default yelp
