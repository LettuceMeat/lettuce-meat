import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const RestaurantsView = () => {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
      >
        <Button>Restaurant 1</Button>
        <Button>Restaurant 2</Button>
        <Button>Restaurant 3</Button>
        <Button>Restaurant 4</Button>
        <Button>Restaurant 5</Button>
      </ButtonGroup>
    </div>
  )
}

export default RestaurantsView
