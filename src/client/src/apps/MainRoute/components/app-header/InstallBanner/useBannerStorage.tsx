export enum PWABanner {
  Shown = 'shown',
  Hidden = 'hidden',
}

export const setBannerState = (value: string) => {
  sessionStorage.setItem('PWABanner', value)
}

export const getBannerState = () => sessionStorage.getItem('PWABanner')
