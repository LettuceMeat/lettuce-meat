import React, {useState, useEffect} from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {makeStyles} from '@material-ui/core/styles'
import {CATEGORIES} from '../constants/categoryPreferences'
import findRestaurants from '../hooks/findRestaurants'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
    // minWidth: 120
  },
  preferences: {
    width: '25%'
  }
}))

const Preferences = ({roomUsers, center, getRestaurants}) => {
  const [categories, setCategories] = useState([])
  const [priceRange, setPriceRange] = useState([])
  const [apiSearch, restaurants, error] = findRestaurants()
  console.log('CATEGORIES', categories)
  console.log('RESTAURANTS', restaurants)

  //Todo: have users choose 1 of each preference
  //When all users select their preference, make the api call

  const handleCategoriesChange = ev => {
    setCategories(() => [...categories, ev.target.value])
  }
  const handlePriceRangeChange = ev => {
    setPriceRange(() => [...priceRange, ev.target.value])
  }

  useEffect(() => {
    if (categories.length && priceRange.length === roomUsers.length) {
      let cat = categories
        .reduce((acc, category) => {
          if (!acc.includes(category)) {
            acc.push(category)
          }
          return acc
        }, [])
        .join(',')
      let uniquePrice = priceRange
        .reduce((acc, price) => {
          if (!acc.includes(price)) {
            acc.push(price)
          }
          return acc
        }, [])
        .join(',')
      const search = {
        categories: cat,
        priceRange: uniquePrice,
        latitude: center.lat,
        longitude: center.lng
      }
      apiSearch(search)
    }
  }, [categories, priceRange, roomUsers])

  useEffect(() => {
    if (restaurants.length) {
      getRestaurants(restaurants)
    }
  }, [restaurants])

  const styles = useStyles()
  return (
    <form className={styles.preferences} onSubmit={ev => ev.preventDefault()}>
      <FormControl className={styles.formControl}>
        <InputLabel id="input-categories">Cuisine</InputLabel>
        <Select value="" onChange={handleCategoriesChange}>
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
        <Select value="" onChange={handlePriceRangeChange}>
          <MenuItem value="1">$</MenuItem>
          <MenuItem value="2">$$</MenuItem>
          <MenuItem value="3">$$$</MenuItem>
          <MenuItem value="4">$$$$</MenuItem>
        </Select>
        <FormHelperText>Choose Price Range</FormHelperText>
      </FormControl>
    </form>
  )
}

export default Preferences
