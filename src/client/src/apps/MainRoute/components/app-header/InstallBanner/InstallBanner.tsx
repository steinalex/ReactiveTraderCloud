import React, { useEffect, useState } from 'react'
import { styled } from 'rt-theme'
import { CrossIcon } from 'rt-components'
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

export const InstallBanner: React.FC = () => {
  const [prompt, promptToInstall] = usePWABannerPrompt()
  const [hideBanner, setHideBanner] = useState<boolean>(true)

  useEffect(() => {
    if (prompt) {
      console.log('PWA_I HAVE A PROMPT!')
      setHideBanner(false)
    }
  }, [prompt])

  return (
    <PWAInstallBanner isHidden={hideBanner}>
      <CrossButton onClick={() => setHideBanner(true)}>{CrossIcon}</CrossButton>
      Experience Reactive Trader on your desktop!
      <InstallButton onClick={promptToInstall}>Install</InstallButton>
    </PWAInstallBanner>
  )
}
