import React from 'react'
import { GridLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='h-screen flex justify-center items-center'>
        <GridLoader color='#005989' />
    </div>
  )
}
