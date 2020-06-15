import React, { useState } from 'react'
import { usePlatform } from 'rt-platforms'
import { styled } from 'rt-theme'

const PWAInstallBanner = styled.div<{ isHidden: boolean }>`
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  position: absolute;
  align-items: center;
  padding: 0 10px;
  top: 60px;
  left: 0;
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.core.textColor};
  color: ${({ theme }) => theme.core.darkBackground};
  z-index: 100;
`

const Install = styled.button`
  background-color: ${({ theme }) => theme.accents.primary.base};
  color: #ffffff;
  padding: 8px 10px;
  margin: 0 10px;
  border-radius: 4px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

export const InstallBanner: React.FC = () => {
  const platform = usePlatform()
  const [isHidden, setIsHidden] = useState<boolean>(false)

  // N.B. In the current version of chrome you have to enable: #bypass-app-banner-engagement-checks

  let deferredPrompt: any
  if (platform.type === 'browser') {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      // Update UI notify the user they can install the PWA
      console.log('ALEX_before install')
    })
  }

  const installPWA = () => {
    console.log('Install button clicked')
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      setIsHidden(true)
    })
  }

  return (
    <PWAInstallBanner isHidden={isHidden}>
      Experience desktop behaviours from our web app
      <Install onClick={installPWA}>Install</Install>
    </PWAInstallBanner>
  )
}
