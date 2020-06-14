import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  img: {
    height: '64px'
  },
  root: {
    border: 'solid black 1px',
    margin: '1em',
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const RestaurantCard = ({restaurant}) => {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <div>{restaurant.name}</div>
      <div>{restaurant.display_phone}</div>
      {/* <img styles={{height:'64px'}} src={restaurant.image_url} /> */}
      <div>{restaurant.image_url}</div>
      <div>{restaurant.is_closed}</div>
      <div>{restaurant.location.address1}</div>
      <div>{restaurant.price}</div>
      <div>{restaurant.rating}</div>
      <div>{restaurant.url}</div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default RestaurantCard
