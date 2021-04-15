import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const logout = ()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');

    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT   // through saga  
    }
}
export const logoutSagaHelper = ()=>{
    return{
            type: actionTypes.AUTH_LOGOUT
        }
}

export const checkAuthTimeout = (expTime)=>{
    // return dispatch => {
    //     setTimeout(()=>{
    //         dispatch(logout());
    //     },expTime * 1000);
    // }
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT, // through saga
        expTime: expTime
    }
}

export const authSuccess = (token,idToken)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        idToken: idToken
    }
}

export const authFails = (error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email,password,isSignup)=>{
    // return dispatch =>{ // we are able to write here async code becoz of thunk (redux).
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+process.env.REACT_APP_FIREBASE_KEY;

    //     if(!isSignup){
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.REACT_APP_FIREBASE_KEY;
    //     }
    //     axios.post(url,authData).then((response)=>{
    //             console.log(response);
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             localStorage.setItem('token',response.data.idToken); // browser local storage api we are using here to store the token so that it will persiste after the reloading of website.
    //             localStorage.setItem('expirationDate',expirationDate);
    //             localStorage.setItem('userId',response.data.localId);
    //             dispatch(authSuccess(response.data.idToken,response.data.localId));
    //             dispatch(checkAuthTimeout(response.data.expiresIn));
    //         }).catch( err => {
    //             console.log(err);
    //             dispatch(authFails(err));
    //         })
    // }
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
}

export const authCheckState = ()=>{
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if(!token){
    //         dispatch(logout());
    //     } else{
    //         const expirationDate = new Date (localStorage.getItem('expirationDate'));
    //         if(expirationDate < new Date()){
    //             dispatch(logout());
    //         } else{
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token,userId));
    //             dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/1000 )); // remaining time in ms.
    //         }
    //     }
    // }

    return {
        type: actionTypes.AUTH_CHECK_STATE // through saga
    }
}

export const setRedirectPath = (path)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}