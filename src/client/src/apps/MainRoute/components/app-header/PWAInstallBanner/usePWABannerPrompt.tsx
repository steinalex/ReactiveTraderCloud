import { useEffect, useState } from 'react'
import { usePlatform } from 'rt-platforms'

export interface InstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export const usePWABannerPrompt = (): [InstallPromptEvent | null, () => void, boolean] => {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)
  const platform = usePlatform()

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt()
    }
    return Promise.reject(new Error("Browser hasn't sent a 'beforeinstallprompt' event"))
  }

  useEffect(() => {
    const ready = (e: InstallPromptEvent) => {
      e.preventDefault()
      if (platform.type === 'browser') {
        setPrompt(e)
      }
    }

    if (typeof window.installPromptEvent === 'undefined') {
      window.addEventListener('beforeinstallprompt', ready as any)
    } else {
      ready(window.installPromptEvent)
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any)
    }
  }, [platform.type])

  return [prompt, promptToInstall, isInstalled]
}
