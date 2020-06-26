import {useState} from 'react'

export default () => {
  const [location, setLocation] = useState({})
  var options = {
    enableHighAccuracy: true,
    maximumAge: 600000,
    timeout: 10000
  }

  function success(pos) {
    setLocation(pos.coords)
    return pos.coords
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }
  const getLocation = navigator.geolocation.getCurrentPosition(
    success,
    error,
    options
  )
  return [getLocation, location]
}
