require('dotenv').config()
const apiKey = process.env.YELP_API_KEY
const axios = require('axios')

// const apiKey =
//   'V3Qcxg2fCH1YC9jGPCm9aiQZ8slihhpQari1h6y_oLiSIkTvNNDPE2POMpR7TebjDMDLCbPx5NiM3nfAIgWD7yxcxPjz0siTO_bmKQuiMxz1CQK5IX3LkMRJ3vbFXnYx'
const yelp = axios.create({
  baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses`,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'content-type': 'application/json'
  }
})
export default yelp
