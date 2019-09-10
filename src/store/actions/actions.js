import axios from 'axios';
import * as actionTypes from './actionTypes';
// variables
import backendUrl from "../../variables/backendURL.js";


// Auth actions ################################################################################

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, name, last_name) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        name: name,
        last_name: last_name
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('company_id');
    localStorage.removeItem('seat_id');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(backendUrl + '/core/login_token/', { //send the login to the server
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.token;
            const name = res.data.name;
            const last_name = res.data.last_name;
            const user_id = res.data.user_id;
            const company_id = res.data.company;
            const seat_id = res.data.seat; 

            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('name', name);
            localStorage.setItem('last_name', last_name);
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('company_id', company_id);
            localStorage.setItem('seat_id', seat_id);

            dispatch(authSuccess(token, name, last_name));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}

// CRUD Actions ################################################################################
// fail request
export const requestFail = error => {
    return {
        type: actionTypes.REQUEST_FAIL,
        error: error
    }
}


// GET_DATA
export const getDataStart = () => {
    return {
        type: actionTypes.GET_DATA_START,
    }
}

export const getDataSuccess = (data) => {
    return {
        type: actionTypes.GET_DATA_SUCCESS,
        data: data,
    }
}

export const getData = (url) => {
    return dispatch => {
        dispatch(getDataStart());
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
            'Accept-Language': 'es-ES,es;q=0.8',
          };
        axios.get(backendUrl + url, {headers})
            .then(res => {
                const data = res.data;
                dispatch(getDataSuccess(data));
            })
            .catch(err => {
                dispatch(requestFail(err))
            })
    }
}


// POST_DATA

export const initializingForm = () => {
    //this sets the requestSuccess state to null, to avoid the success message when the page load
    //this sets data to [] to prevent to some forms charge invalid data from cache
    return {
        type: actionTypes.INITIALIZING_FORM 
    }
}

export const postDataStart = () => {
    return {
        type: actionTypes.POST_DATA_START
    }
}

export const postDataSuccess = () => {
    return {
        type: actionTypes.POST_DATA_SUCCESS,
    }
}

export const postData = (data, url)  => {
    return dispatch => {
        dispatch(postDataStart());
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
            'Accept-Language': 'es-ES,es;q=0.8',
          };
        axios.post(backendUrl + url, data, {headers})
            .then(res => {
                dispatch(postDataSuccess());
            })
            .catch(err => {
                dispatch(requestFail(err))
                console.log(err.response.data)
            })
    }
}


// DELETE_DATA
export const deleteDataStart = () => {
    return {
        type: actionTypes.DELETE_DATA_START,
    }
}

export const deleteDataSuccess = () => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
    }
}

export const deleteData = (url) => {
    return dispatch => {
        dispatch(deleteDataStart());
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
            'Accept-Language': 'es-ES,es;q=0.8',
          };
        axios.delete(backendUrl + url, {headers})
            .then(res => {
                const data = res.data;
                dispatch(deleteDataSuccess());
            })
            .catch(err => {
                dispatch(requestFail(err))
            })
    }
}


// EDIT_DATA

export const initializingEdit = data => {
    return {
        type: actionTypes.INITIALIZING_EDIT,
        data: data,
    }
}