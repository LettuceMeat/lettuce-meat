const axios = require('axios')

const apiKey =
  'V3Qcxg2fCH1YC9jGPCm9aiQZ8slihhpQari1h6y_oLiSIkTvNNDPE2POMpR7TebjDMDLCbPx5NiM3nfAIgWD7yxcxPjz0siTO_bmKQuiMxz1CQK5IX3LkMRJ3vbFXnYx'
const yelp = axios.create({
  baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses`,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'content-type': 'application/json'
  }
})
export default yelp
// 'use strict'

// const yelp = require('yelp-fusion')

// // Place holder for Yelp Fusion's API Key. Grab them
// // from https://www.yelp.com/developers/v3/manage_app
// const apiKey =
//   'V3Qcxg2fCH1YC9jGPCm9aiQZ8slihhpQari1h6y_oLiSIkTvNNDPE2POMpR7TebjDMDLCbPx5NiM3nfAIgWD7yxcxPjz0siTO_bmKQuiMxz1CQK5IX3LkMRJ3vbFXnYx'

// const searchRequest = {
//   term: 'Four Barrel Coffee',
//   location: 'san francisco, ca',
//   bearerToken: apiKey
// }

// const client = yelp.client(apiKey)

// client
//   .search(searchRequest)
//   .then(response => {
//     const firstResult = response.jsonBody.businesses[0]
//     const prettyJson = JSON.stringify(firstResult, null, 4)
//     console.log(prettyJson)
//   })
//   .catch(e => {
//     console.log(e)
//   })

// export default client
