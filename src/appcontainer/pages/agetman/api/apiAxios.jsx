import axios from 'axios';

import {
	actionLoadStateStarted,
	actionLoadStateSuccess,
	actionLoadStateFailure,
	//
	actionImportItemsStarted,
	actionImportItemsSuccess,
	actionImportItemsFailure,
	//
	actionExportItemsDo,
	//
	actionSendItemStarted,
	actionSendItemSuccess,
	actionSendItemFailure,
} from '../actions/actionObjects';
import substParams from './apiUtils';

const storage = localStorage;

export function actionLoadState() {
	return dispatch => {
		dispatch(actionLoadStateStarted());
		new Promise((resolve, reject) => {
			try {
				//localStorage.clear();
				resolve(JSON.parse(storage.getItem("items")) || []);
			} catch (err) {
				reject(err);
			}
		})
		.then(storageItem => {
			dispatch(actionLoadStateSuccess(storageItem));
		})
		.catch(err => {
			dispatch(actionLoadStateFailure(err));
		});
	};
}

export function actionImportItems(file) {
	return dispatch => {
		dispatch(actionImportItemsStarted());
	
		var reader = new FileReader();
		reader.onload = function(event) {
			try {
				const jsonContent = JSON.parse(event.target.result);
				dispatch(actionImportItemsSuccess(jsonContent) || []);
			} catch(e) {
				alert(e);
				//console.error('Error JSONParse', e.message);
			}
		};
		reader.onerror = function(event) {
			dispatch(actionImportItemsFailure(event.type));
		};
	
		reader.readAsText(file);
	};
}

export function actionExportItems(items) {
	return dispatch => {
		dispatch(actionExportItemsDo(items));
	};
}

export function actionSendItem(item, items) {
	return dispatch => {
		dispatch(actionSendItemStarted(item));
		const req = substParams(item.value, items);
		axios
		.get(req)
		.then(res => {
			dispatch(actionSendItemSuccess(item, res));
		})
		.catch(err => {
			dispatch(actionSendItemFailure(item, err));
		});
	};
}
