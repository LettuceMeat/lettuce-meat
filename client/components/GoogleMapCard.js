import React, {Component} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import {googleKey} from '../../secrets'
const styles = require('../../GoogleMapStyles.json')

class GoogleMapCard extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {latitude, longitude, restaurantData, userData} = this.props
    return (
      <Map className='mapContainer'
        google={this.props.google}
        initialCenter={{
          lat: latitude,
          lng: longitude
        }}
        zoom={13}
        draggable={true}
        disableDefaultUI={true}
        styles={styles}
      >
        <Marker title="Current location" name="Current location" />

        {userData &&
          userData.map(user => {
            const coordinates = {lat: user.lat, lng: user.lng}
            return (
              <Marker
                key={user.id}
                title={user.userName}
                name={user.userName}
                position={coordinates}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                }}
              />
            )
          })}

        {restaurantData &&
          restaurantData.map(restaurant => {
            const {latitude, longitude} = restaurant.coordinates
            const coordinates = {lat: latitude, lng: longitude}
            return (
              <Marker
                key={restaurant.id}
                title={restaurant.name}
                name={restaurant.name}
                position={coordinates}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                }}
              />
            )
          })}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: googleKey
})(GoogleMapCard)
