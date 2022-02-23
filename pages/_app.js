import '../styles/global.css'
import React from 'react'
import { Provider } from 'react-redux'
import dynamic from 'next/dynamic'
import store from '../lib/store'
import { appWithTranslation } from 'next-i18next'

// To avoid a race, never render the iframe in SSR
const IFrame = dynamic(() => import('./IFrameEmbed'), { ssr: false })

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <IFrame />
    </Provider>
  )
}

export default appWithTranslation(App)
