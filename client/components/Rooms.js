import React, {useState} from 'react'
import findRestaurants from '../hooks/findRestaurants'
import {CATEGORIES} from '../constants/categoryPreferences'
import findLocation from '../hooks/getLocation'

const Rooms = () => {
  const [category, setCategory] = useState('')
  const [apiSearch, restaurants] = findRestaurants()
  const [getLocation, location] = findLocation()
  const submit = ev => {
    ev.preventDefault()

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
              <div key={idx}>{restaurant.name}</div>
            ))
          : null}
      </div>
    </div>
  )
}

export default Rooms
