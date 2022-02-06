import '../styles/global.css'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../lib/store'
const KUBESAIL_API_TARGET = process.env.NEXT_PUBLIC_KUBESAIL_API_TARGET

export default function App({ Component, pageProps }) {
  useEffect(() => fetchProfile(), [])

  async function fetchProfile() {
    const profileRes = await window.fetch(`${KUBESAIL_API_TARGET}/profile`, {
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })
    if (profileRes.status === 200) {
      store.dispatch({ type: 'SET_PROFILE', profile: await profileRes.json() })
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
