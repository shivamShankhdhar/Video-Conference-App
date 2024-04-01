'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
  const router = useRouter()
  const call = useCall();

  const { useLocalParticipant } = useCallStateHooks()

  const localParticipant = useLocalParticipant()

  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id

  if (!isMeetingOwner) return null;

  return (
    <Button
      className='bg-red-500'
      onClick={async () => {
        await call.endCall()
        if (!isMeetingOwner || isMeetingOwner)
          router.push('/')
      }}
    >End call for everyone</Button>
  )
}

export default EndCallButton
