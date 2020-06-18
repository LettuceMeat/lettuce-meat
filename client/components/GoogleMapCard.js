import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import {googleKey} from '../../secrets'

class GoogleMapCard extends Component {
  constructor() {
    super()
    this.state = {
      // latitude: props.latitude,
      // longitude: props.longitude
    }
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
        <Marker onClick={this.onMarkerClick} name="Current location" />
        {markerData &&
          markerData.map(restaurant => {
            const {latitude, longitude} = restaurant.coordinates
            const coordinates = {lat: latitude, lng: longitude}
            return <Marker name={restaurant.name} position={coordinates} />
          })}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: googleKey
})(GoogleMapCard)
