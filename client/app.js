import React from 'react'

import {Header, Nav} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="gray">
      <div className="bgGradient">
        <Header />
        <Nav />
        <div className="mainCard">
          <Routes />
        </div>
      </div>
    </div>
  )
}

export default App
