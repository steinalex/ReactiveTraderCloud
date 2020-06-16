import { useEffect, useState } from 'react'
import { usePlatform } from 'rt-platforms'

interface InstallPrompEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export const usePWABannerPrompt = (): [
  InstallPrompEvent | null,
  () => void,
  boolean,
  () => void
] => {
  const [prompt, setPrompt] = useState<InstallPrompEvent | null>(null)
  const [isBannerHidden, setIsBannerHidden] = useState<boolean>(false)
  const platform = usePlatform()

  const hideBanner = () => {
    setIsBannerHidden(true)
  }

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt()
    }
    return Promise.reject(new Error("Browser hasn't sent a 'beforeinstallprompt' event"))
  }

  useEffect(() => {
    const ready = (e: InstallPrompEvent) => {
      e.preventDefault()
      if (platform.type === 'browser') {
        setPrompt(e)
      }
    }

    window.addEventListener('appinstalled', evt => {
      console.log('PWA_THE APP IS INSTALLED')
    })

    window.addEventListener('beforeinstallprompt', ready as any)

    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any)
    }
  }, [platform.type])

  return [prompt, promptToInstall, isBannerHidden, hideBanner]
}
