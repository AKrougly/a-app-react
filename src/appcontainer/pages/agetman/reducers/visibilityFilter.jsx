import { VisibilityFilters } from '../model/consts';
import { LOAD_STATE, SET_VISIBILITY_FILTER } from '../actions/types';

function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case LOAD_STATE:
      return action.state.visibilityFilter;
    case SET_VISIBILITY_FILTER:
      return action.value;
    default:
      return state;
  }
}

export default visibilityFilter;
