import React, { useRef } from 'react'
import { PWABanner, InstallButton } from './PWAInstallBanner'
import { usePWABannerPrompt } from './usePWABannerPrompt'

interface InstallLaunchProps {
  bannerState: string | null
}

export const InstallLaunchButton: React.FC<InstallLaunchProps> = ({ bannerState }) => {
  const [prompt, setPrompt] = usePWABannerPrompt()
  const hideAfterInstall = useRef<boolean>(false)

  window.addEventListener('appinstalled', evt => {
    console.log('APP JUST INSTALLED, HIDE INSTALL BUTTON')
    hideAfterInstall.current = true
  })

  console.log(hideAfterInstall)

  const isHidden = hideAfterInstall.current || bannerState !== PWABanner.Shown

  if (prompt !== null && isHidden) {
    return <InstallButton onClick={setPrompt}>Install PWA</InstallButton>
  } else {
    return <></>
  }
}
