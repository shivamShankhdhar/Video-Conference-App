
"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from './use-toast'

const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

  const { user } = useUser();

  const client = useStreamVideoClient()

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })

  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast()
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" })
        return;
      }
      const id = crypto.randomUUID()

      const call = client.call('default', id);
      if (!call) throw new Error("Failed to create a new call");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description }
        }
      })
      setCallDetails(call)
      if (!values.description) { router.push(`/meeting/${call.id}`) }
      toast({
        title: "Meeting Created"
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to create meeting"
      })
    }

  }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        icon='/icons/add-meeting.svg'
        bgColor='bg-orange-1'
        alt='add meeting'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={() => setMeetingState('isInstantMeeting')}
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
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList
