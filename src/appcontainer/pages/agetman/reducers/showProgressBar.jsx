import { LOAD_STATE, TOGGLE_SHOW_PROGRESS_BAR } from '../actions/types';

function showProgressBar(state = false, action) {
  switch (action.type) {
    case LOAD_STATE:
      return action.state.showProgressBar;
    case TOGGLE_SHOW_PROGRESS_BAR:
      return !state;
    default:
      return state;
  }
}

export default showProgressBar;
