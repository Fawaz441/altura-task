import React from 'react'
import clsx from 'classnames'
import PropTypes from 'prop-types'
import { MediaRenderer } from '@thirdweb-dev/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import close from '../assets/icons/close.png'
import copy from '../assets/icons/copy.png'
import { toast } from 'react-hot-toast'


const NFTDetailModal = ({ active_nft, removeActiveNft }) => {
  return (
    <div
      role='presentation'
      onClick={removeActiveNft}
      className={clsx(
        'fixed opacity-0 bg-black/[.6] cursor-pointer top-0 left-0 w-full pointer-events-none flex justify-center h-screen',
        { '!pointer-events-auto !opacity-100': active_nft },
      )}
    >
      {active_nft && (
        <div
          role='presentation'
          onClick={(e) => e.stopPropagation()}
          className='relative pb-4 cursor-default scrollbar-hide overflow-y-auto max-h-[calc(100vh_-_100px)] bg-white shadow-md self-start lg:w-[400px] rounded-lg mt-5 p-5'
        >
          <div className='flex items-center justify-between z-[2] absolute px-5 top-0 left-0 w-full h-[50px] mb-5'>
            <h1 className='text-black text-xl'>{active_nft.name}</h1>
            <button type='button' title='Close Modal' onClick={removeActiveNft}>
              <img className='h-5 w-5' src={close} />
            </button>
          </div>
          <div className='max-h-[600px] pt-[50px] '>
            <a target="_blank" rel="noreferrer" href={`https://opensea.io/assets/ethereum/${active_nft.token_address}`} className='bg-black text-white rounded-full py-2 px-4'>
              Purchase
            </a>
            {active_nft?.normalized_metadata?.image && (
              <div className='h-[250px] mt-5 overflow-hidden rounded-sm'>
                <MediaRenderer
                  className='!w-full !h-[250px] object-contain transition-all duration-150'
                  src={active_nft.normalized_metadata.image}
                  alt={active_nft.name}
                />
              </div>
            )}
            <ul className='flex flex-col space-y-4 mt-5'>
              <li className='flex items-center justify-between'>
                <span className='font-regular text-[18px] text-black'>Symbol</span>
                <span className='font-semibold text-right text-black text-base'>
                  {active_nft.symbol}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='font-regular text-[18px] text-black'>Amount</span>
                <span className='font-semibold text-right text-black text-base'>
                  {active_nft.amount}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='font-regular text-[18px] text-black'>Block Number</span>
                <span className='font-semibold text-right text-black text-base'>
                  {active_nft.block_number}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='font-regular text-[18px] text-black'>Block Number Minted</span>
                <span className='font-semibold text-right text-black text-base'>
                  {active_nft.block_number_minted}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='font-regular text-[18px] text-black'>Contract Type</span>
                <span className='font-semibold text-right text-black text-base'>
                  {active_nft.contract_type}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='font-regular text-[18px] flex-shrink-0 text-black'>
                  Minter Address
                </span>
                <div className='flex items-center space-x-1'>
                  <CopyToClipboard
                    text={active_nft.minter_address}
                    onCopy={() => toast.success('Minter address copied to clipboard!')}
                  >
                    <img src={copy} className='h-5 w-5 cursor-pointer' />
                  </CopyToClipboard>
                  <span className='font-semibold overflow-hidden flex-grow-0 max-w-[150px] text-ellipsis  text-right text-black text-base'>
                    {active_nft.minter_address}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

NFTDetailModal.propTypes = {
  active_nft: PropTypes.shape({
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
  removeActiveNft: PropTypes.func
}

export default NFTDetailModal
