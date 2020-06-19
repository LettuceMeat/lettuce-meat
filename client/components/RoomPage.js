import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import GroupIcon from '@material-ui/icons/Group'
import findRestaurants from '../hooks/findRestaurants'
import {generateRoomCode} from '../../script/utils'
import history from '../history'

const useStyles = makeStyles({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    justifyContent: 'center'
  },
  createButtonStyle: {
    background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
    border: 0,
    color: 'white',
    fontSize: 'large',
    margin: 5
  }
})

const RoomPage = () => {
  // const [restaurants] = findRestaurants()

  const styles = useStyles()

  const createRoom = () => {
    const roomCode = generateRoomCode()
    //check here to make sure room code is unique
    history.push(`/room/${roomCode}`)
  }

  return (
    <div className={styles.container}>
      <Button className={styles.createButtonStyle} onClick={() => createRoom()}>
        <AddCircleOutlineRoundedIcon />
        Create Room
      </Button>
      <Button className={styles.createButtonStyle}>
        <GroupIcon />
        Join Room
      </Button>
      <Button>Making a request</Button>
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
