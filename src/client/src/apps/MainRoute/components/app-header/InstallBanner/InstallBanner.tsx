import React, { useEffect, useState } from 'react'
import { CrossIcon } from 'rt-components'
import { styled } from 'rt-theme'
import { PWABanner } from './useBannerStorage'
import { usePWABannerPrompt } from './usePWABannerPrompt'

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

const CrossButton = styled.div`
  width: 24px;
  height: 24px;
  &:hover {
    cursor: pointer;
  }
`

export const InstallButton = styled.button`
  background-color: ${({ theme }) => theme.accents.primary.base};
  color: #ffffff;
  padding: 8px 10px;
  margin: 0 10px;
  border-radius: 4px;
`

const SESSION = 'PWABanner'

export const InstallBanner: React.FC = () => {
  const [prompt, promptToInstall] = usePWABannerPrompt()
  const [banner, setBanner] = useState(sessionStorage.getItem(SESSION))

  useEffect(() => {
    if (prompt && banner === null) {
      sessionStorage.setItem(SESSION, PWABanner.Shown)
    }
  }, [prompt, banner])

  const closeBanner = () => {
    setBanner(PWABanner.Hidden)
    sessionStorage.setItem(SESSION, PWABanner.Hidden)
  }

  return (
    <PWAInstallBanner isHidden={banner === PWABanner.Hidden}>
      <CrossButton onClick={closeBanner}>{CrossIcon}</CrossButton>
      Experience Reactive Trader on your desktop!
      <InstallButton onClick={promptToInstall}>Install</InstallButton>
    </PWAInstallBanner>
  )
}
