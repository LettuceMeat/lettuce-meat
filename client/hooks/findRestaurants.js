import {useState} from 'react'
import axios from 'axios'

export default () => {
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState('')

  const apiSearch = async search => {
    try {
      const response = await axios.post('/api/yelp', {
        limit: search.limit || 10,
        categories: search.categories || '',
        latitude: search.latitude || 0,
        longitude: search.longitude || 0,
        radius: 1500
      })
      setRestaurants(response.data)
    } catch (ex) {
      console.error('Error', ex)
      setError('Something went wrong requesting restaurants', ex)
    }
  }

  return [apiSearch, restaurants, error]
}
