import { VisibilityFilters } from './consts';

const initialState = {
  showProgressBar: false,
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  filter: false,
  showDeleted: false,
  items: [],
};

export default initialState;
