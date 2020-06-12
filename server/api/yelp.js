require('dotenv').config()
const apiKey = process.env.YELP_API_KEY
const axios = require('axios')

const yelp = axios.create({
  baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses`,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'content-type': 'application/json'
  }
})
export default yelp
