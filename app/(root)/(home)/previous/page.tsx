import CallList from '@/components/ui/CallList'
import React from 'react'

const page = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-2xl font-bold'>
        Previous Meetings
      </h1>
      <CallList type='ended' />
    </section>
  )
}

export default page
