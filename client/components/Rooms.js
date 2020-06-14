import React, {useState} from 'react'
import findRestaurants from '../hooks/findRestaurants'
import {CATEGORIES} from '../constants/categoryPreferences'
import findLocation from '../hooks/getLocation'
import RestaurantCard from './RestaurantCard'

const Rooms = () => {
  const [category, setCategory] = useState('')
  const [apiSearch, restaurants] = findRestaurants()
  const [getLocation, location] = findLocation()
  const submit = ev => {
    ev.preventDefault()
    console.log('You are here:', location.latitude, location.longitude)
    console.log('You should be here: 40.7763571 -73.9242136')
    const searchObj = {
      categories: category,
      latitude: location.latitude,
      longitude: location.longitude
    }

    apiSearch(searchObj)
      .then(rsp => console.log(rsp, restaurants, 'GOOD'))
      .catch(err => console.log(err, 'BAD'))
  }

  return (
    <div>
      <form>
        <select onChange={ev => setCategory(ev.target.value)}>
          {CATEGORIES.map((category, idx) => {
            const {value, disabled} = category
            return (
              <option key={idx} value={value} disabled={disabled}>
                {value}
              </option>
            )
          })}
        </select>
      </form>
      <button onClick={ev => submit(ev)}>Search</button>
      <div>
        {restaurants
          ? restaurants.map((restaurant, idx) => (
              <RestaurantCard key={idx} restaurant={restaurant} />
            ))
          : null}
      </div>
    </div>
  )
}

export default Rooms
