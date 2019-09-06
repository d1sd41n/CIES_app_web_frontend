import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// Auth ###########################################
const initialState = {
    token: null,
    error: null, 
    loading: false,
    name: null,
    last_name: null,
    data: [],
    requestSuccess : null,
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
        name: action.name,
        last_name: action.last_name
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });
}

// getdata ###########################################

const getDataStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const getDataSuccess = (state, action) => {
    return updateObject(state, {
        data: action.data,
        error: null,
        loading: false,
    });
}

// postdata ###########################################

const initializingForm = (state, action) => {
    return updateObject(state, {
        requestSuccess : null,
    });
}

const postDataStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        requestSuccess : null
    });
}

const postDataSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        requestSuccess : true
    });
}

// deletedata ###########################################

const deleteDataStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const deleteDataSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
}


// request fail
const requestFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        // Auth reducers
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        //get data reducers
        case actionTypes.GET_DATA_START: return getDataStart(state, action);
        case actionTypes.GET_DATA_SUCCESS: return getDataSuccess(state, action);
        //post data reducers
        case actionTypes.INITIALIZING_FORM: return initializingForm(state, action);
        case actionTypes.POST_DATA_START: return postDataStart(state, action);
        case actionTypes.POST_DATA_SUCCESS: return postDataSuccess(state, action);
        //delete data reducers
        case actionTypes.DELETE_DATA_START: return deleteDataStart(state, action);
        case actionTypes.DELETE_DATA_SUCCESS: return deleteDataSuccess(state, action);



        // request fail
        case actionTypes.REQUEST_FAIL: return requestFail(state, action);
        default:
            return state;
    }
}

export default reducer;