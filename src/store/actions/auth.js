import authAxios from '../../axios/auth';
import logsAxios from '../../axios/logs';
import * as actionTypes from "./actionTypes";

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('uid');
    return {
        type: actionTypes.LOGOUT
    };
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, uid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: uid
    };
};

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err.response.data.error
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
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
                const timeLeft = response.data.expiresIn * 1000;
                const expirationDate = new Date().getTime() + timeLeft;
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('uid', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(timeLeft));
            })
            .catch(err => {
                dispatch(authFail(err));
            }) 
    };
}

export const localAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const timeLeft = new Date(parseInt(localStorage.getItem('expirationDate'))) - new Date();
            console.log(timeLeft);
            if (timeLeft <= 0) {
                dispatch(logout());
            } else {
                const uid = localStorage.getItem('uid');
                dispatch(authSuccess(token, uid));
                dispatch(checkAuthTimeout((timeLeft)));
            }   
        }
    };
};