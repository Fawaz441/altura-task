import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { isEmpty } from 'lodash'
import nftAPI from '../api/moralis'
import { Loader, NFTDetailModal, NFTItem } from '../components'
import { usePagination, useScrollToBottom } from '../hooks'

const NFTList = () => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isInitial, setIsInitial] = useState(true)
  const { nextPage, cursor, setCursor } = usePagination()
  const [activeNft, setActiveNft] = useState(null)

  const reachedBottom = useScrollToBottom()

  const clearInitialStatus = () => {
    if (isInitial) {
      setIsInitial(false)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data } = await nftAPI.fetchNFTS({
        chain: 'eth',
        format: 'decimal',
        normalizeMetadata: true,
        cursor,
        disable_total: false,
      })
      setCursor(data.cursor)
      setNfts([...nfts, ...data.result])
      setLoading(false)
      clearInitialStatus()
    } catch (e) {
      if (!cursor) {
        toast((t) => (
          <span>
            <b className='text-[red]'>There was an error!</b>
            <button
              onClick={() => {
                toast.dismiss(t.id)
                fetchData()
              }}
            >
              Try again
            </button>
          </span>
        ))
      }
      toast.error('There was an error. Please try again.', { duration: 3000 })
      setLoading(false)
    }
  }

  const fetchList = () => {
    if ((loading && !isInitial) || (!nextPage && !isInitial)) {
      return
    }
    fetchData()
  }

  useEffect(() => {
    fetchList()
  }, [])

  useEffect(() => {
    if (reachedBottom && !loading) {
      fetchData()
    }
  }, [reachedBottom])

  return (
    <div className='min-h-screen'>
      {loading && isEmpty(nfts) ? (
        <div className='flex flex-col space-y-3 items-center justify-center h-screen w-full'>
          <h2 className='text-primary text-[40px]'>NFT Place.</h2>
          <div className='flex items-center justify-center'>
            <Loader />
          </div>
        </div>
      ) : (
        <div>
          <div className='px-10 pt-5'>
            <h2 className='text-primary text-[30px] font-bold'>NFTPlace.</h2>
          </div>
          <div className='p-10 transition-all duration-150 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
            {nfts.map((nft, index) => (
              <NFTItem
                data={nft}
                key={`${index}-${nft.token_address}`}
                showDetails={setActiveNft}
              />
            ))}
          </div>
          <NFTDetailModal active_nft={activeNft} removeActiveNft={() => setActiveNft(null)} />
          <div className='h-[50px] flex items-center justify-center'>
            {loading && !isEmpty(nfts) && <Loader />}
          </div>
        </div>
      )}
    </div>
  )
}

export default NFTList
