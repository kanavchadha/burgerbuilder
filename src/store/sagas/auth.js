import { delay } from 'redux-saga/effects';
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSagaHelper());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expTime * 1000) // delays the next code to be execute
    yield put(actions.logout());
}
console.log(process.env.REACT_APP_FIREBASE_KEY);
export function* authSaga(action){
    yield put(actions.authStart());
        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+process.env.REACT_APP_FIREBASE_KEY;

        if(!action.isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.REACT_APP_FIREBASE_KEY;
        }

        try{
            const response = yield axios.post(url,authData) // as we know, axios.post() will return a promise but here we are using  yield keyword for waiting the promise to be resolved or rejected instead of then and catch block.
            
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            yield localStorage.setItem('token',response.data.idToken); // browser local storage api we are using here to store the token so that it will persiste after the reloading of website.
            yield localStorage.setItem('expirationDate',expirationDate);
            yield localStorage.setItem('userId',response.data.localId);
            yield put(actions.authSuccess(response.data.idToken,response.data.localId));
            yield put(actions.checkAuthTimeout(response.data.expiresIn));
        }catch(err){
            console.log(err);
            yield put(actions.authFails(err));
        }
}


export function* checkAuthStateSaga(action){
    const token = yield localStorage.getItem('token');
        if(!token){
            yield put(actions.logout());
        } else{
            const expirationDate = yield new Date (localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                yield put(actions.logout());
            } else{
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token,userId));
                yield put(actions.checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/1000 )); // remaining time in ms.
            }
        }
}