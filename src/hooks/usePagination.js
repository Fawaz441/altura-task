import { useState } from 'react'

const usePagination = () => {
  const [nextPage, setNextPage] = useState('')
  const [cursor, setCursor] = useState(null)

  return {
    nextPage,
    setNextPage,
    cursor,
    setCursor,
  }
}

export default usePagination
