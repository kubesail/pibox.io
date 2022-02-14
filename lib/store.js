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

export function kubeSailFetch(path = '/', opts = {}) {
  const postMessageDomain =
    window.location.hostname === 'localhost' ? 'https://localhost:3000' : 'https://pibox.io'
  window.frames[0].postMessage({ type: 'apiFetch', path, opts }, postMessageDomain)
  return new Promise((resolve, _reject) => {
    window.addEventListener('message', e => {
      if (e.data.type !== 'apiFetchResponse') return
      const res = JSON.parse(e.data.data)
      resolve(res)
    })
  })
}

const store = createStore(reducer)

export default store
