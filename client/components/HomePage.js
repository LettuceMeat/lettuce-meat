import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import GroupIcon from '@material-ui/icons/Group'
import {generateRoomCode} from '../../script/utils'
import history from '../history'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '350px',
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

  const createRoom = async() => {
    const roomCode = generateRoomCode()
    const newRoom = (await axios.post(`/api/room/${roomCode}`))
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
        <Link to="/join">Join Room</Link>
      </Button>
    </div>
  )
}

export default HomePage
