import { HttpMethods } from '../model/consts';
import {
  LOAD_STATE,
  ADD_ITEM,
  CHANGE_ITEM,
  IMPORT_ITEMS_SUCCESS,
  EXPORT_ITEMS_DO,
} from '../actions/types';

const itemAction = (item, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        uid: action.uid,
        name: action.name,
        value: action.value,
        httpMethod:  HttpMethods.GET,
        response: "",
        error: "",
        sended: null,
        completed: false,
        deleted: false,
        time: new Date(),
      };
    case CHANGE_ITEM:
      if (item.uid !== action.item.uid) {
        return item;
      }
      return {
        ...item,
        name: action.item.name,
        value: action.item.value,
        httpMethod:  action.item.httpMethod,
        response: action.item.response,
        error: action.item.error,
        completed: action.item.completed,
        deleted: action.item.deleted,
        sended: action.item.sended,
      };
    default:
      return item;
  }
};

const items = (state = [], action) => {
  switch (action.type) {
    case LOAD_STATE:
      return action.state.items;
    case ADD_ITEM:
      return [
        ...state,
        itemAction(undefined, action),
      ];
    case CHANGE_ITEM:
      return state.map(t =>
        itemAction(t, action)
      );
    case IMPORT_ITEMS_SUCCESS:
      return action.items;
    case EXPORT_ITEMS_DO:
      var text = JSON.stringify(state, null, '  ')/*.replace(/\\/g, '')*/;
  		navigator.clipboard.writeText(text);
      return state;
    default:
      return state;
  }
};

export default items;
