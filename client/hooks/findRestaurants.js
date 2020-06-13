import {useState, useEffect} from 'react'
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
          location: 'new york'
        }
      })
      setRestaurants(res.data.businesses)
    } catch (ex) {
      console.error(ex, 'ERROR')
      setError('Something went wrong')
    }
  }

  // console.log(restaurants)
  return [apiSearch, restaurants]
}
