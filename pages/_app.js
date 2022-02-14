import '../styles/global.css'
import React from 'react'
import { Provider } from 'react-redux'
import dynamic from 'next/dynamic'
import store from '../lib/store'

// To avoid a race, never render the iframe in SSR
const IFrame = dynamic(() => import('./IFrameEmbed'), { ssr: false })

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <IFrame />
    </Provider>
  )
}
