import React, {Component} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import {googleKey} from '../../secrets'

class GoogleMapCard extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {latitude, longitude, markerData} = this.props
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: latitude,
          lng: longitude
        }}
        zoom={14}
      >
        <Marker title="Current location" name="Current location" />
        {markerData &&
          markerData.map(restaurant => {
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
