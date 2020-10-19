function filter(state = false, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.state.filter;
    case 'TOGGLE_FILTER':
      return !state;
    default:
      return state;
  }
}

export default filter;
