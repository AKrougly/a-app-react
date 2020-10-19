import { combineReducers } from 'redux';

import showProgressBar from './showProgressBar';
import visibilityFilter from './visibilityFilter';
import filter from './filter';
import showDeleted from './showDeleted';
import items from './items';

const rootReducer = combineReducers({
  showProgressBar,
	visibilityFilter,
  filter,
  showDeleted,
  items
});

export default rootReducer;
