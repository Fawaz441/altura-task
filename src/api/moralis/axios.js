import defaultAxios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const moralisAxios = defaultAxios.create({
  baseURL: `https://deep-index.moralis.io/api/v2`,
  headers: {
    accept: 'application/json',
    'X-API-Key': apiKey,
  },
})

export default moralisAxios
