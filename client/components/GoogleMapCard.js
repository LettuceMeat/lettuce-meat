import React, {Component} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import {googleKey} from '../../secrets'
const apiKey = process.env.GOOGLE_API_KEY || googleKey
const styles = require('../../GoogleMapStyles.json')

class GoogleMapCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.loadHandler = this.loadHandler.bind(this)
  }

  loadHandler(mapProps, map) {
    const points = this.props.userData.map(user => {
      return {lat: user.lat*1, lng: user.lng*1}
    })

    const bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    map.fitBounds(bounds)
  }

  render() {
    const {restaurantData, userData} = this.props

    const userPoints = userData.map(user => {
      return {lat: user.lat*1, lng: user.lng*1}
    })
    const restaurantPoints = restaurantData.map(restaurant => {
      return {lat: restaurant.coordinates.latitude*1, lng: restaurant.coordinates.longitude*1}
    })

    const bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < userPoints.length; i++) {
      bounds.extend(userPoints[i]);
    }
    for (let i = 0; i < restaurantPoints.length; i++) {
      bounds.extend(restaurantPoints[i]);
    }

    return (
      <Map className='mapContainer'
        google={this.props.google}
        draggable={true}
        disableDefaultUI={true}
        styles={styles}
        onReady={this.loadHandler}
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
                  url: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
                }}
              />
            )
          })}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(GoogleMapCard)
