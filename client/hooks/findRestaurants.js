import {useState} from 'react'
import yelp from '../../server/api/yelp'

export default () => {
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState('')

  const apiSearch = async searchTerm => {
    try {
      const res = await yelp.get('/search', {
        params: {
          limit: 3,
          term: searchTerm,
          latitude: '40.708360', //input of coordinates will
          longitude: '-73.828640' //be inserted from users location
        }
      })
      setRestaurants(res.data.businesses)
    } catch (ex) {
      setError('Something went wrong')
    }
  }

  console.log(restaurants)
  return [apiSearch, restaurants]
}
