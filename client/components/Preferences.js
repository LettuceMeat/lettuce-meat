import React, {useState, useEffect} from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {makeStyles} from '@material-ui/core/styles'
import {CATEGORIES} from '../constants/categoryPreferences'
import findRestaurants from '../hooks/findRestaurants'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
    // minWidth: 120
  },
  preferences: {
    margin: '1rem'
  }
}))

const Preferences = ({roomUsers, center, getRestaurants, roomId}) => {
  const [category, setCategories] = useState(`-- types --`)
  const [price, setPriceRange] = useState(`1`)
  const user = useSelector(state => state.user)
  const [apiSearch, restaurants, error] = findRestaurants()

  //Todo: have users choose 1 of each preference
  //When all users select their preference, make the api call

  const handleCategoriesChange = ev => {
    setCategories(() => ev.target.value)
  }
  const handlePriceRangeChange = ev => {
    setPriceRange(() => ev.target.value)
  }

  useEffect(() => {
    if (restaurants.length) {
      getRestaurants(restaurants)
    }
  }, [restaurants])

  const sendPreference = () => {
  const preference = {
    cuisine: category,
    moneys: price,
    center: center
  }
  axios.post(`/api/submit/${roomId}/${user.id}`, {preference})
}

  const styles = useStyles()
  return (
    <form className={styles.preferences} onSubmit={ev => ev.preventDefault()}>
      <FormControl className={styles.formControl}>
        <InputLabel id="input-categories">Cuisine</InputLabel>
        <Select value={category} onChange={handleCategoriesChange}>
          {CATEGORIES.map((category, idx) => {
            const {value, disabled} = category
            return (
              <MenuItem key={idx} value={value} disabled={disabled}>
                {value}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>Choose Cuisine</FormHelperText>
      </FormControl>
      <FormControl className={styles.formControl}>
        <InputLabel id="input-price">Price Range</InputLabel>
        <Select value={price} onChange={handlePriceRangeChange}>
          <MenuItem value="1">$</MenuItem>
          <MenuItem value="2">$$</MenuItem>
          <MenuItem value="3">$$$</MenuItem>
          <MenuItem value="4">$$$$</MenuItem>
        </Select>
        <FormHelperText>Choose Price Range</FormHelperText>
        <Button onClick={() => sendPreference()}>Submit</Button>
      </FormControl>
    </form>
  )
}

export default Preferences
