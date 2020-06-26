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
    const {restaurantData, userData} = this.props

    const points = userData.map(user => {
      return {lat: user.lat*1, lng: user.lng*1}
    })

    const bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    if (!points) return <h1>loading...</h1>
    return (
      <Map className='mapContainer'
        google={this.props.google}
        draggable={true}
        disableDefaultUI={true}
        styles={styles}
        bounds={bounds}
      >

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
                label={{
                  text: user.userName,
                  fontFamily: "Arial",
                  fontSize: "16px",
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
