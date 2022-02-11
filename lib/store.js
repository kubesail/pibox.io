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

const store = createStore(reducer)

export default store
