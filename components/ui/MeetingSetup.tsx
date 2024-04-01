import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './button'

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {

  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)

  const call = useCall()

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone])

  return (
    <div className='flex flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Video Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input
            type='checkbox'
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          ></input>
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className='rounded-md bg-green-500 px-4'
        onClick={() => {
          call?.join();
          setIsSetupComplete(true)
        }}
      >
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
