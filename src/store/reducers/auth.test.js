import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', ()=>{
    it('should return the intial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: "/"
        });
    })

    it('should store token on login',()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: "/"
        },{
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            idToken: 'some user-id'  
        })).toEqual({
            token: 'some-token',
            userId: 'some user-id',
            error: null,
            loading: false,
            redirectPath: "/"
        });
    })
});