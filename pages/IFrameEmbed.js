import React from 'react'
import store, { kubeSailFetch } from '../lib/store'

export default function IFrameEmbed() {
  const embedDomain =
    process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : 'https://kubesail.com'
  const embed = React.createRef()

  const [fetchedProfile, setFetchedProfile] = React.useState(false)

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
    if (embed.current && typeof window !== 'undefined') {
      window.addEventListener('message', async e => {
        if (e.data.type === 'apiFetchReady') {
          setIframeReady(true)
        }
      })
    }
  }, [embed])

  return (
    <iframe
      name="kubesail-fetch"
      src={`${embedDomain || ''}/loginEmbed.html`}
      width={0}
      height={0}
      style={{ display: 'none' }}
      ref={embed}
    />
  )
}
