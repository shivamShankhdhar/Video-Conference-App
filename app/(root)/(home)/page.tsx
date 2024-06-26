'use client'
import MeetingTypeList from '@/components/ui/MeetingTypeList';
import React, { useEffect, useState } from 'react'

const Homepage = () => {

  let now = dateNow();
  function dateNow() {
    let dateNow = new Date()
    return dateNow
  }
  setInterval(dateNow, 1000);
  const [timeNow, setTimeNow] = useState('')


  const date = (new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' })).format(now)
  useEffect(() => {
    setInterval(() => {
      const timeNow = new Date()
      const time = timeNow.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      setTimeNow(time)
    }, 1000)
  }, [timeNow])
  return (
    <section className='flex size-full flex-col gap-10 top-0 text-white'>
      <div className="h-[250px] w-full bg-hero rounded-[20px] bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM </h2>
          <div className="flex flex-col gap-2">
            <h1 className='text-5xl font-extrabold lg:text-5xl'>
              {timeNow}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Homepage
