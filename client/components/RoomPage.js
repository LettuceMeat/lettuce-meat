import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import GroupIcon from '@material-ui/icons/Group'
import findRestaurants from '../hooks/findRestaurants'

const useStyles = makeStyles({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb5234',
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    justifyContent: 'center'
  },
  createButtonStyle: {
    backgroundColor: '#eb5234',
    border: 0,
    color: 'white',
    fontSize: 'large',
    margin: 5
  }
})

const RoomPage = () => {
  const [apiSearch, restaurants] = findRestaurants()

  const styles = useStyles()
  return (
    <div className={styles.container}>
      <Button className={styles.createButtonStyle}>
        <AddCircleOutlineRoundedIcon />
        Create Room
      </Button>
      <Button className={styles.createButtonStyle}>
        <GroupIcon />
        Join Room
      </Button>
      <Button onClick={() => apiSearch('pasta')}>Making a request</Button>
      <div>
        {restaurants
          ? restaurants.map(restaurant => (
              <div key={restaurant.id}>{restaurant.name}</div>
            ))
          : null}
      </div>
    </div>
  )
}

export default RoomPage
