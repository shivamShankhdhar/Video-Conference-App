import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'


type callLayoutType = 'grid' | 'speaker-left' | 'spkeaker-right'

const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get('personal')

  const [layout, setLayout] = useState("speaker-left")

  const [showParticipants, setShowParticipants] = useState(true)

  const { useCallCallingState } = useCallStateHooks()

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />
      default:
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px]">
          <CallLayout />
        </div>
        <div className={cn("hidden ml-2 h-[calc(100vh-86px)]", { 'show-block': showParticipants })}>

          <CallParticipantsList onClose={() => {
            setShowParticipants(false)
          }} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />


        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className='cursor-poiner rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList
                size={20}
                className='text-white'
              />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {['Grid', 'Speaker-Right', 'Speaker-Left'].map((item, index) => {
              return (
                <div key={index}>
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => {
                      setLayout(item.toLowerCase() as callLayoutType)
                    }}
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='border-dark-1' />
                </div>)
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl  bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className='text-white' />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section >
  )
}

export default MeetingRoom
