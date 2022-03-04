import '../styles/global.css'
import React from 'react'
import { Provider } from 'react-redux'
import dynamic from 'next/dynamic'
import store, { kubeSailFetch } from '../lib/store'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }) => {
  React.useEffect(async () => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const profileRes = await kubeSailFetch('/profile')
    if (profileRes.status === 200) {
      store.dispatch({ type: 'SET_PROFILE', profile: profileRes.body })
    } else {
      console.log('Error fetching profile.', profileRes.status)
    }
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(App)
