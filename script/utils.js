//returns a string of 4 random letters
const generateRoomCode = () => {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += alpha.charAt(Math.floor(Math.random() * 26))
  }
  return code
}

//takes an array of [lat, lng] user location arrays
//returns the average coordinates, aka the room center
const averageUserLocation = users => {
  const summed = users.reduce(
    (sum, coord) => {
      sum[0] += coord[0]
      sum[1] += coord[1]
      return sum
    },
    [0, 0]
  )
  const average = [summed[0] / users.length, summed[1] / users.length]

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
