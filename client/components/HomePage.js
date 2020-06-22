import React from 'react'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import GroupIcon from '@material-ui/icons/Group'
import {generateRoomCode} from '../../script/utils'
import history from '../history'

const useStyles = makeStyles({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    justifyContent: 'center'
  },
  createButtonStyle: {
    //background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
    border: 0,
    color: 'rgb(1, 74, 54)',
    fontSize: 'larger',
    margin: 5
  }
})

const HomePage = () => {
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
    </div>
  )
}

export default HomePage
