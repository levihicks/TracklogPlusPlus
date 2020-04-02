import authAxios from '../../axios/auth';
import logsAxios from '../../axios/logs';
import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (response) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: response.data.idToken,
        userId: response.data.localId
    };
};

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err.response.data.error
    };
};

export const auth = (email, pass, loggingIn) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: pass,
            returnSecureToken: true
        }
        let url = "accounts:".concat(loggingIn ? "signInWithPassword" : "signUp");
        authAxios.post(url, authData)
            .then(response => {
                if (!loggingIn){
                    let uid = response.data.localId;
                    let token = response.data.idToken;
                    logsAxios.post("/logs/"+uid+".json?auth="+token, 
                        {placeholder: "placeholder"})
                        .catch(err => console.log(err));
                }
                dispatch(authSuccess(response));
            })
            .catch(err => {
                dispatch(authFail(err));
            }) 
    };
}