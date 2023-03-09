import React from 'react'
import "./styles/globals.css";
import { Toaster } from 'react-hot-toast'
import NFTList from './pages'

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      <Toaster />
      <NFTList />
    </div>
  );
}
