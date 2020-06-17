import React, { useState } from 'react'
import { PWABanner, InstallButton } from './PWAInstallBanner'
import { usePWABannerPrompt } from './usePWABannerPrompt'
interface InstallLaunchProps {
  bannerState: string | null
}
export const InstallLaunchButton: React.FC<InstallLaunchProps> = ({ bannerState }) => {
  const [prompt, setPrompt] = usePWABannerPrompt()
  const [hideAfterInstall, setHideAfterInstall] = useState<boolean>(false)

  window.addEventListener('appinstalled', evt => {
    setHideAfterInstall(true)
  })

  const isHidden = bannerState !== PWABanner.Shown

  if (hideAfterInstall || prompt === null || !isHidden) {
    return null
  }

  return <InstallButton onClick={setPrompt}>Install PWA</InstallButton>
}
