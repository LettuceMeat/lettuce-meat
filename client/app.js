import React from 'react'

import {Header, Nav, Footer} from './components'
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
        <Footer />
      </div>
    </div>
  )
}

export default App
