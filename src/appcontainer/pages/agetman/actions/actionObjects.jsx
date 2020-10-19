import { v1 as uuid } from 'uuid';

import {
  TOGGLE_SHOW_PROGRESS_BAR,
  SET_VISIBILITY_FILTER,
  TOGGLE_FILTER,
  TOGGLE_SHOW_DELETED,
  LOAD_STATE,
  LOAD_STATE_FAILURE,
  ADD_ITEM,
  CHANGE_ITEM,
  IMPORT_ITEMS_STARTED,
  IMPORT_ITEMS_SUCCESS,
  IMPORT_ITEMS_FAILURE,
  EXPORT_ITEMS_DO,
} from './types';
import initialState from '../model/initialState';
import { SendStatuses } from '../model/consts';

export const actionToggleShowProgressBar = () => ({
  type: TOGGLE_SHOW_PROGRESS_BAR
})

export const actionSetVisibilityFilter = value => ({
  type: SET_VISIBILITY_FILTER,
  value
})

export const actionToggleFilter = () => ({
  type: TOGGLE_FILTER
})

export const actionToggleShowDeleted = () => ({
  type: TOGGLE_SHOW_DELETED
})

export const actionLoadStateStarted = () => ({
  type: LOAD_STATE,
  state: initialState,
});

export const actionLoadStateSuccess = (state) => ({
  type: LOAD_STATE,
  state,
});

export const actionLoadStateFailure = (err) => ({
  type: LOAD_STATE_FAILURE,
  error: err,
});

export const actionAddItem = value => ({
  type: ADD_ITEM,
  uid: uuid(),
  value
})

export const actionChangeItem = item => ({
  type: CHANGE_ITEM,
  item
})

export const actionImportItemsStarted = () => ({
  type: IMPORT_ITEMS_STARTED,
});

export const actionImportItemsSuccess = (items) => ({
  type: IMPORT_ITEMS_SUCCESS,
  items: items,
});

export const actionImportItemsFailure = (err) => ({
  type: IMPORT_ITEMS_FAILURE,
  error: err,
});

export const actionExportItemsDo = (items) => ({
  type: EXPORT_ITEMS_DO,
  items: items,
});

export const actionSendItemStarted = item => ({
  type: CHANGE_ITEM,
  item: { ...item, response: "", error: "", sended: SendStatuses.SEND_STARTED, },
});

export const actionSendItemSuccess = (item, res) => ({
  type: CHANGE_ITEM,
  item: { ...item, response: JSON.stringify(res.data), error: null, sended: SendStatuses.SEND_SUCCESS, },
});

function err2Str(err) {
  // Error 😨
  if (err.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    //console.log(err.response.data);
    //console.log(err.response.status);
    //console.log(err.response.headers);
    return JSON.stringify(err.response.data);
  } else if (err.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    //console.log(err.request);
    return err.request;
  } else {
    // Something happened in setting up the request and triggered an Error
    //console.log('Error', err.message);
    return 'Error:' + err.message;
  }
}

export const actionSendItemFailure = (item, err) => ({
  type: CHANGE_ITEM,
  item: { ...item, response: "", error: err2Str(err), sended: SendStatuses.SEND_FAILURE, },
});
/*
export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
}

export const deletePost = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};

export const fetchAllPosts = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchPosts(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
*/
