import { createStore } from 'redux'

export const initialState = {
  profile: null,
  loadingProfile: true,
}
function reducer(state = initialState, action) {
  if (!action.type) {
    throw new Error('RootReducer received undefined action type')
  }
  switch (action.type) {
    case 'SET_PROFILE': {
      return { ...state, profile: action.profile, loadingProfile: action.loadingProfile || false }
    }
    default:
      return state
  }
}

export async function kubeSailFetch(path = '/', opts = {}) {
  const apiTarget =
    process.env.NEXT_PUBLIC_KUBESAIL_API_TARGET ||
    (window.location.hostname === 'localhost'
      ? 'https://localhost:3000'
      : 'https://api.kubesail.com')
  const res = await window.fetch(`${apiTarget}${path}`, {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    ...opts,
  })
  const status = res.status
  const headers = res.headers
  const body = await res.json()
  return { status, headers, body }
}

if (typeof window !== 'undefined') {
  window.kubeSailFetch = kubeSailFetch
}

const store = createStore(reducer)

export default store
