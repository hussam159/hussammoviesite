import initialState from '../initialState'

const SET_PROGRESS = 'SET_PROGRESS'
export default function loadingBar(state = initialState, action) {
  switch (action.type) {
    case SET_PROGRESS:
      state.progress = action.payload

      return {...state}

    default:
      return state
  }
}