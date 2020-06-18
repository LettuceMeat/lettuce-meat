import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import DirectionsIcon from '@material-ui/icons/Directions'
import GradeIcon from '@material-ui/icons/Grade'
import PhoneIcon from '@material-ui/icons/Phone'

const useStyles = makeStyles(theme => ({
  img: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: '100%',
    minWidth: '100%',
    transform: 'translate(-50%, -50%)'
  },
  imgWrap: {
    width: '95%',
    height: '150px',
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    margin: '0'
  },
  root: {
    border: 'solid black 1px',
    margin: '2rem',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const RestaurantCard = ({restaurant}) => {
  const styles = useStyles()
  return (
    <div fullWidth className={styles.root}>
      <a href={restaurant.url} className={styles.imgWrap}>
        <img className={styles.img} src={restaurant.image_url} />
      </a>
      <h1>{restaurant.name}</h1>
      <a href={`tel:${restaurant.display_phone}`}>
        <PhoneIcon style={{color: 'black'}} />
        {restaurant.display_phone}
      </a>
      <div>
        <DirectionsIcon />
        {restaurant.location.address1}
      </div>
      <div>{restaurant.price}</div>
      <div>
        <GradeIcon />
        {restaurant.rating} / 5
      </div>
    </div>
  )
}

export default RestaurantCard
