import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GlobalStyle } from 'rt-theme'
import * as serviceWorker from './serviceWorker'
import { getSymphonyPlatform } from 'rt-platforms'
import { getEnvironment } from 'rt-util/getEnvironment'
import { APP_PATHS, getAppName } from 'rt-util'
import { InstallPromptEvent } from './apps/MainRoute/components/app-header/PWAInstallBanner/usePWABannerPrompt'

const MainRoute = lazy(() => import('./apps/MainRoute'))
const StyleguideRoute = lazy(() => import('./apps/StyleguideRoute'))
const SimpleLauncher = lazy(() => import('./apps/SimpleLauncher'))

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault()
  window.installPromptEvent = e as InstallPromptEvent
})

//TODO: Move to environment variables / config.
const trackingId = 'UA-46320965-5'
ReactGA.initialize(trackingId, {
  debug: process.env.NODE_ENV === 'development',
})

const { pathname } = new URL(window.location.href)
const urlParams = new URLSearchParams(window.location.search)

async function init() {
  console.info('BUILD_VERSION: ', process.env.REACT_APP_BUILD_VERSION)

  const env = getEnvironment()

  document.title = getAppName(pathname || document.title)

  ReactGA.set({
    dimension3: env,
    page: window.location.pathname,
  })

  if (urlParams.has('startAsSymphonyController')) {
    const { initiateSymphony } = await getSymphonyPlatform()
    await initiateSymphony(urlParams.get('env') || undefined)
  } else {
    ReactDOM.render(
      <React.Fragment>
        <GlobalStyle />
        <BrowserRouter>
          <Suspense fallback={<div />}>
            <Switch>
              <Route path={APP_PATHS.LAUNCHER} render={() => <SimpleLauncher />} />
              <Route path={APP_PATHS.STYLEGUIDE} render={() => <StyleguideRoute />} />
              <Route render={() => <MainRoute />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </React.Fragment>,
      document.getElementById('root')
    )

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register()
  }
}

init()
