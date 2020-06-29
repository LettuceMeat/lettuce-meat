import React, {useState} from 'react'
// import {findRestaurants} from '../hooks/findRestaurants'
import {CATEGORIES} from '../constants/categoryPreferences'
import findLocation from '../hooks/getLocation'
import RestaurantCard from './RestaurantCard'
import GoogleMapCard from './GoogleMapCard'
import {makeStyles} from '@material-ui/core/styles'
import {useParams} from 'react-router-dom'
import Phase1BottomNav from './Phase1BottomNav'

const useStyles = makeStyles({
  googleMapContainer: {
    position: 'relative',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '300px',
    padding: '0 30px'
  }
})

const Rooms = () => {
  const styles = useStyles()
  const {roomId} = useParams()
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

    // apiSearch(searchObj)
    //   .then(rsp => console.log(rsp, restaurants, 'GOOD'))
    //   .catch(err => console.log(err, 'BAD'))
  }

  return (
    <div>
      <div className={styles.root}>{`you are in room: ${roomId}`}</div>
      <form>
        <select onChange={ev => setCategory(ev.target.value)}>
          <option key="none" value="" />
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
      <div className={styles.googleMapContainer}>
        {location.latitude &&
          location.longitude && (
            <GoogleMapCard
              latitude={location.latitude}
              longitude={location.longitude}
              markerData={restaurants}
            />
          )}
      </div>
      <div>
        {restaurants
          ? restaurants.map((restaurant, idx) => {
              if (!restaurant.is_closed) {
                return <RestaurantCard key={idx} restaurant={restaurant} />
              }
            })
          : null}
      </div>
      <Phase1BottomNav />
    </div>
  )
}

export default Rooms
