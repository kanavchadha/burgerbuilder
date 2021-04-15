import { takeEvery } from 'redux-saga/effects';
import {logoutSaga,checkAuthTimeoutSaga, authSaga, checkAuthStateSaga} from './auth';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth(){ // listener for logoutSaga which executes whenever we dispatch for AUTH_INITIATE_LOGOUT.
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER,authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE,checkAuthStateSaga);
}
