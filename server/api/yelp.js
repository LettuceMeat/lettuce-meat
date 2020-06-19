require('dotenv').config()
const router = require('express').Router()
const {yelpKey} = require('../../secrets')
const apiKey = process.env.YELP_API_KEY || yelpKey
const axios = require('axios')
module.exports = router

// const yelp = axios.create({
//   baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses`,
//   headers: {
//     Authorization: `Bearer ${apiKey}`
//   }
// })
router.get('/', async (req, res, next) => {
  console.log('YELP!!!!!!!!!')
  try {
    const output = await axios.get(
      `https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        },
        //pass in the req.body
        params: {
          limit: 3,
          location: 'new york',
          term: 'pasta'
        }
      }
    )
    console.log('OUTPUT', output.data.businesses)

    res.send(output.data.businesses)
  } catch (ex) {
    next(ex)
  }
})

// axios.get('/search', (req, res, next) => {
//   const apiSearch = async search => {
//     try {
//       const res = await yelp.get('/search', {
//         params: {
//           limit: search.limit || 10,
//           categories: search.categories || '',
//           latitude: search.latitude || 0,
//           longitude: search.longitude || 0,
//           radius: 1500
//         }
//       })
//       setRestaurants(res.data.businesses)
//       return res.data.businesses
//     } catch (ex) {
//       console.error(ex, 'ERROR IN YELP')
//       setError('Something went wrong')
//     }
//   }
// })

// export default yelp
