import {useEffect, useState} from 'react'
import yelp from '../../server/api/yelp'
// import {apiKey, yelp} from '../../server/api/yelp'

export default () => {
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState('')

  const apiSearch = async searchTerm => {
    try {
      const res = await yelp.get('/search', {
        headers: {
          Authorization: `Bearer V3Qcxg2fCH1YC9jGPCm9aiQZ8slihhpQari1h6y_oLiSIkTvNNDPE2POMpR7TebjDMDLCbPx5NiM3nfAIgWD7yxcxPjz0siTO_bmKQuiMxz1CQK5IX3LkMRJ3vbFXnYx`
        },
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
  useEffect(() => {
    apiSearch('burgers')
  }, [])

  console.log(restaurants)
  return [apiSearch, restaurants]
}
