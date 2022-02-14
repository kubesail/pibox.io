import '../styles/global.css'
import React from 'react'
import { Provider } from 'react-redux'
import store, { kubeSailFetch } from '../lib/store'

export default function App({ Component, pageProps }) {
  const [fetchedProfile, setFetchedProfile] = React.useState(false)

  const embedDomain =
    process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : 'https://kubesail.com'
  const embed = React.createRef()

  const [iframeReady, setIframeReady] = React.useState(false)

  React.useEffect(async () => {
    if (!fetchedProfile && iframeReady) {
      const profileRes = await kubeSailFetch('/profile')
      if (profileRes.status === 200) {
        store.dispatch({ type: 'SET_PROFILE', profile: profileRes.body })
      } else {
        console.log('Error fetching profile.', profileRes.status)
      }
      setFetchedProfile(true)
    }
  }, [iframeReady])

  React.useEffect(() => {
    if (embed.current) {
      setIframeReady(true)
    }
  }, [embed])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <iframe
        name="kubesail-fetch"
        src={`${embedDomain || ''}/loginEmbed.html`}
        width={0}
        height={0}
        style={{ display: 'none' }}
        ref={embed}
      />
    </Provider>
  )
}
