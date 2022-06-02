import '../styles/global.css'
import React from 'react'
import Cookies from 'cookies-js'
import { Provider } from 'react-redux'
import dynamic from 'next/dynamic'
import store, { kubeSailFetch } from '../lib/store'
import { appWithTranslation } from 'next-i18next'
import { withRouter } from 'next/router'

const App = ({ Component, pageProps, router }) => {
  React.useEffect(async () => {
    fetchProfile()
  }, [])

  React.useEffect(setRefCookie, [])
  function setRefCookie() {
    const { ref } = router.query
    if (ref) {
      Cookies.set('PLATFORM_REF', ref, {
        expires: new Date(new Date().getTime() + 10 * 365 * 24 * 60 * 60 * 1000),
      })
    }
  }

  async function fetchProfile() {
    try {
      const profileRes = await kubeSailFetch('/profile')
      if (profileRes.status === 200) {
        store.dispatch({ type: 'SET_PROFILE', profile: profileRes.body })
      } else if (profileRes.status === 401) {
        await kubeSailFetch('/pibox/test-cookie/true')
        const cookieTest = await kubeSailFetch('/pibox/test-cookie/false')
        if (cookieTest.status === 401) {
          // This User Agent doesn't allow 3rd party cookies, so don't try to fetch their profile,
          // but also don't block parts of the UI (like showing login button)
          store.dispatch({ type: 'SET_PROFILE', profile: {} })
          return
        }
      } else {
        console.log('Error fetching profile.', profileRes.status)
      }
    } catch (err) {
      console.warn('Error fetching profile.', err.message)
    }
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(withRouter(App))
