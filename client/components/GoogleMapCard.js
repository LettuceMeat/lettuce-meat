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
    console.log('props here', this.props)
    const {latitude, longitude, markerData} = this.props
    console.log('render restaurants', markerData)
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          // lat: 40.7763571,
          // lng: -73.9242136,
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
        {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_maBtBW0i3hgIDLtTm95C7jf714s57AU'
})(GoogleMapCard)
