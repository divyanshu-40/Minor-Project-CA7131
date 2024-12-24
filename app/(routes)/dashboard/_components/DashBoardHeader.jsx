import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashBoardHeader() {
  return (
    <div className='p-5 shadow-sm border-b'>
      <div className='flex justify-center'>
        Search Bar
      </div>

      <div className='fixed right-5 top-5'>
        <UserButton />
      </div>
    </div>
  )
}

export default DashBoardHeader
