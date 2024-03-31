
"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'


const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        icon='/icons/add-meeting.svg'
        bgColor='bg-orange-1'
        alt='add meeting'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />

      <HomeCard
        icon='/icons/schedule.svg'
        bgColor='bg-blue-1'
        alt='Schedule meeting'
        title='Schedule meeting'
        description='Plan your Meeting'
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />

      <HomeCard
        icon='/icons/recordings.svg'
        bgColor='bg-purple-1'
        alt='recordings'
        title='View Recordings'
        description='Check out your recordings'
        handleClick={() => router.push('/recordings')}
      />

      <HomeCard
        icon='/icons/join-meeting.svg'
        bgColor='bg-yellow-1'
        alt='join meeting'
        title='Join meeting'
        description='Join meeting via link.'
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
    </section>
  )
}

export default MeetingTypeList
