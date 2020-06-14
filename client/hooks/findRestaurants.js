import {useState, useEffect} from 'react'
import yelp from '../../server/api/yelp'

export default () => {
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState('')

  const apiSearch = async search => {
    try {
      const res = await yelp.get('/search', {
        params: {
          limit: search.limit || 10,
          categories: search.categories || '',
          latitude: search.latitude || 0,
          longitude: search.longitude || 0,
          radius: 1500
        }
      })
      setRestaurants(res.data.businesses)
      return res.data.businesses
    } catch (ex) {
      console.error(ex, 'ERROR')
      setError('Something went wrong')
    }
  }

  return [apiSearch, restaurants]
}
