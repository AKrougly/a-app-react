import { LOAD_STATE, TOGGLE_SHOW_DELETED } from '../actions/types';

function showDeleted(state = false, action) {
  switch (action.type) {
    case LOAD_STATE:
      return action.state.showDeleted;
    case TOGGLE_SHOW_DELETED:
      return !state;
    default:
      return state;
  }
}

export default showDeleted;
