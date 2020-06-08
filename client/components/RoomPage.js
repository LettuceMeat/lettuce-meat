import React from 'react'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import GroupIcon from '@material-ui/icons/Group'

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
    </div>
  )
}

export default RoomPage
