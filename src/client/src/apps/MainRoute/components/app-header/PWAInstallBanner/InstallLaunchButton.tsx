import React from 'react'
import { PWABanner, InstallButton } from './PWAInstallBanner'
import { usePWABannerPrompt } from './usePWABannerPrompt'

interface InstallLaunchProps {
  bannerState: string | null
}

export const InstallLaunchButton: React.FC<InstallLaunchProps> = ({ bannerState }) => {
  const [prompt, setPrompt] = usePWABannerPrompt()

  const isHidden = bannerState !== PWABanner.Shown

  if (prompt !== null && isHidden) {
    return <InstallButton onClick={setPrompt}>Install PWA</InstallButton>
  } else {
    return <></>
  }
}
