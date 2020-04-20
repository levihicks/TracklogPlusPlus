import * as actionTypes from "./actionTypes";
import { 
    doCreateUserWithEmailAndPassword, 
    doSignInWithEmailAndPassword,
    doSignOut 
} from '../../firebase';

export const logout = () => {
    doSignOut();
    return {
        type: actionTypes.LOGOUT
    };
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    };
};

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const auth = (email, pass, loggingIn) => {
    return dispatch => {
        dispatch(authStart());
        if(!loggingIn){
            doCreateUserWithEmailAndPassword(email, pass)
                .then(authUser => {
                    dispatch(authSuccess());
                })
                .catch(err => {
                    dispatch(authFail(err));
                }) 
        }
        else {
            doSignInWithEmailAndPassword(email, pass)
                .then(()=>dispatch(authSuccess()))
                .catch(err=> {
                    dispatch(authFail(err))
                })
        }
    };
};