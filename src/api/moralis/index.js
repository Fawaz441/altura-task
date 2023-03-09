import moralisAxios from './axios'

const address = process.env.REACT_APP_ADDRESS

const nftAPI = {
  fetchNFTS: (params) =>
    moralisAxios.get(`/${address}/nft`, { params }),
}

export default nftAPI
