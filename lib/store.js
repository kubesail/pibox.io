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
  const apiHost =
    process.env.NEXT_PUBLIC_KUBESAIL_API_TARGET ||
    (window.location.hostname === 'localhost'
      ? 'https://localhost:3000'
      : 'https://api.kubesail.com')
  return window.fetch(apiHost + path, {
    headers: { 'content-type': 'application/json' },
    ...opts,
  })
}

const store = createStore(reducer)

export default store
