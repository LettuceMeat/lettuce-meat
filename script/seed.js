'use strict'

const db = require('../server/db')
const {Room, User, Message, Preference, Restaurant} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [roomAFLO, roomYUQS, roomADMG] = await Promise.all([
    Room.create({name: 'AFLO', lat: 40.765628, lng: -73.916954}), //astoria
    Room.create({name: 'YUQS', lat: 40.732445, lng: -73.953338}), //greenpoint
    Room.create({name: 'ADMG', lat: 40.70525, lng: -74.009566}) //fullstack
  ])
  console.log('3 rooms created')

  const [cody, murphy] = await Promise.all([
    User.create({
      userName: 'Cody',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      userName: 'Murphy',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      userName: 'admin',
      email: 'admin@lettucemeat.com',
      password: '456',
      isAdmin: true,
    })
  ])
  console.log('2 users created')

  await Promise.all([
    Restaurant.create({yelpId: 'k4QfaFoqtpEZ1LZylJZqww', name: 'JJ\'s Fusion', sponsored: true, sponsorshipExpiration: 1596168000000}),
    Restaurant.create({yelpId: 'u3JBjUgrCdxy6WF0tnX3SA', name: 'Aji Sushi House', sponsored: true, sponsorshipExpiration: 1596168000000}),
    Restaurant.create({yelpId: 'S7ivv5O0beH3U9cV3cRD_Q', name: 'Jujube Tree', sponsored: true, sponsorshipExpiration: 1596168000000}),
  ])

  const [preference1, preference2] = await Promise.all([
    Preference.create({cuisine: 'Chinese', moneys: '$$', userId: cody.id}),
    Preference.create({cuisine: 'Italian', moneys: '$$$', userId: murphy.id})
  ])
  console.log('2 preferences created')

  const [message1, message2] = await Promise.all([
    Message.create({
      content: "hey there guys, let's pick a good restaurant",
      userId: cody.id,
      roomName: roomAFLO.name
    }),
    Message.create({
      content: "let's meet in Brooklyn",
      userId: murphy.id,
      roomName: roomAFLO.name
    })
  ])
  console.log('2 messages created')
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
