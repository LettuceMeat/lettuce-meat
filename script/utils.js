//returns a string of 4 random letters
const generateRoomCode = () => {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += alpha.charAt(Math.floor(Math.random() * 26))
  }
  return code
}

const averageUserLocation = users => {
  if (!users.length) return {lat: 0, lng: 0}
  const summed = users.reduce(
    (sum, user) => {
      sum[0] += (user.lat*1)
      sum[1] += (user.lng*1)
      return sum
    },
    [0, 0]
  )
  const average = {lat: summed[0] / users.length, lng: summed[1] / users.length}
  return average
}

//takes a room center [lat,lng] array and a user location array
//gives the result in kilometers
const distanceFromCenter = (centerCoord, userCoord) => {
  const lat = Math.pow(centerCoord[0] - userCoord[0], 2)
  const lng = Math.pow(centerCoord[1] - userCoord[1], 2)
  const distance = Math.sqrt(lat + lng)

  return distance * 100
}

export {generateRoomCode, averageUserLocation, distanceFromCenter}
