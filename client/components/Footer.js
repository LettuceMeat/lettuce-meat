import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {

  return (
    <div className="footer">
        <div className='footerPerson darkFontMedium'>
          <span className='footerName'>Andres Callanaupa</span>
          <a className='darkFontSmall' href="https://www.linkedin.com/in/andrescallanaupa/">LinkedIn</a>
          <a className='darkFontSmall' href="https://github.com/avc278">Github</a>
        </div>

        <div className='footerPerson darkFontMedium'>
          <span className='footerName'>Diana Aguilar</span>
          <a className='darkFontSmall' href="https://www.linkedin.com/in/diana-aguilar/">LinkedIn</a>
          <a className='darkFontSmall' href="https://github.com/DianaCAguilar">Github</a>
        </div>

        <div className='footerPerson darkFontMedium'>
          <span className='footerName'>Jonathan Cordero</span>
          <a className='darkFontSmall' href="https://www.linkedin.com/in/jonathancordero7/">LinkedIn</a>
          <a className='darkFontSmall' href="https://github.com/Cryptcur">Github</a>
        </div>

        <div className='footerPerson darkFontMedium'>
          <span className='footerName'>Mike Olsen</span>
          <a className='darkFontSmall' href="https://www.linkedin.com/in/mikeo3d/">LinkedIn</a>
          <a className='darkFontSmall' href="https://github.com/olsen3d">Github</a>
        </div>
    </div>
  )
}