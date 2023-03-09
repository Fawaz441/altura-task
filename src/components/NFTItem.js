import React from 'react'
import { MediaRenderer } from '@thirdweb-dev/react'
import PropTypes from 'prop-types'


const NFTItem = ({ data, showDetails }) => {
  return (
    <div
      className='rounded overflow-hidden shadow-lg cursor-pointer'
      role='presentation'
      onClick={() => showDetails(data)}
    >
      <div className='h-[250px] overflow-hidden'>
        {data?.normalized_metadata?.image ? (
          <MediaRenderer
            className='!w-full !h-[250px] object-cover hover:scale-[1.2] transition-all duration-150'
            src={data.normalized_metadata.image}
            alt={data.name}
          />
        ) : (
          //   <img
          //     className='w-full h-[250px] object-cover hover:scale-[1.2] transition-all duration-150'
          //     src={data.normalized_metadata.image}
          //     alt={data.name}
          //   />
          <div className='h-[250px] bg-[grey]/[.5]' />
        )}
      </div>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{data.name}</div>
        <p className='text-gray-700 text-base nft-description'>
          {data.normalized_metadata?.description}
        </p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {data.contract_type}
        </span>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {data.symbol}
        </span>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {data.name}
        </span>
      </div>
    </div>
  )
}

NFTItem.propTypes = {
  data: PropTypes.shape({
    amount: PropTypes.string,
    block_number: PropTypes.string,
    block_number_minted: PropTypes.string,
    contract_type: PropTypes.string,
    last_metadata_sync: PropTypes.string,
    last_token_uri_sync: PropTypes.string,
    metadata: PropTypes.string,
    minter_address: PropTypes.string,
    name: PropTypes.string,
    normalized_metadata: PropTypes.shape({
      animation_url: PropTypes.string,
      attributes: PropTypes.arrayOf(PropTypes.any),
      description: PropTypes.string,
      external_link: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string
    }),
    owner_of: PropTypes.string,
    symbol: PropTypes.string,
    token_address: PropTypes.string,
    token_hash: PropTypes.string,
    token_id: PropTypes.string,
    token_uri: PropTypes.string,
  }),
  showDetails: PropTypes.func
}

export default NFTItem
