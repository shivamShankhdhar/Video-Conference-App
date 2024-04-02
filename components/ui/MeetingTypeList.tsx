
"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from './use-toast'
import { Textarea } from './textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './input'

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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
      {!callDetails ?
        (
          <MeetingModal
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Schedule Meeting"
            buttonText="Schedule meeting"
            handleClick={createMeeting}
          >
            <div className="flex flex-col gap-2 5">
              <label className='text-base text-normal leading-[22px] text-sky-2'>
                Add a description
              </label>
              <Textarea
                className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                onChange={(e) => {
                  setValues({ ...values, description: e.target.value })
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-2 5">
              <label className='text-base text-normal leading-[22px] text-sky-2'>
                Select Date and Time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => {
                  setValues({ ...values, dateTime: date! })
                }}
                showTimeSelect
                timeFormat='HH:MM'
                timeIntervals={15}
                timeCaption='time'
                dateFormat="MMMM d, yyyy h:mm aa"
                className='w-full rounded bg-dark-3 p-2 focus:outline-none'
              />
            </div>
          </MeetingModal>
        ) :
        (<MeetingModal
          className='text-center'
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Meeting Link Copied" })
          }}

          image="/icons/checked.svg"
          buttonIcon='/icons/copy.svg'
          buttonText="Copy meeting link"
        />)
      }

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />


      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type or paste link here"
        buttonText="Join meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder='Meeting link'
          className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e) => {
            setValues({ ...values, link: e.target.value })
          }}
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList
