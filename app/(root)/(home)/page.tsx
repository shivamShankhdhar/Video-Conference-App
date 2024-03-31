import MeetingTypeList from '@/components/ui/MeetingTypeList';
import React from 'react'

const Homepage = () => {
  // let months =
  //   ['January', 'February', 'March', 'April',
  //     'May', 'June', 'July', 'August',
  //     'September', 'October', 'November', 'December'];
  // const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const date = (new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' })).format(now)

  return (
    <section className='flex size-full flex-col gap-10 top-0 text-white'>
      <div className="h-[250px] w-full bg-hero rounded-[20px] bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM </h2>
          <div className="flex flex-col gap-2">
            <h1 className='text-5xl font-extrabold lg:text-5xl'>
              {time}
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
