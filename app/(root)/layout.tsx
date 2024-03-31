
import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </div>
  )
}

export default RootLayout
