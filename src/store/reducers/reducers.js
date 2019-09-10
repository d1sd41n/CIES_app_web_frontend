import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// Initital state ###########################################
const initialState = {
    //user variables
    token: null,
    name: null,
    last_name: null,
    //general variables
    error: null, 
    loading: false,
    data: [],
    requestSuccess : null,
    item_id: null,
    //auth variables
    authLoading: false,
    // edit variables
    start_edit: false, // this is set to true when you're going to edit data
}

// Auth ###########################################
const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        authLoading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        authLoading: false,
        name: action.name,
        last_name: action.last_name
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        authLoading: false
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
        loading: true,
        data: [],
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
        data: [],
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


// editData ###########################################

const initializingEdit = (state, action) => {
    return updateObject(state, {
        data: action.data,
        start_edit: true,
        requestSuccess : null,
    });
}

const editDataStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        requestSuccess : null
    });
}

const editDataSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        requestSuccess : true
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
        //edit data reducers
        case actionTypes.INITIALIZING_EDIT: return initializingEdit(state, action);
        case actionTypes.EDIT_DATA_START: return editDataStart(state, action);
        case actionTypes.EDIT_DATA_SUCCESS: return editDataSuccess(state, action);



        // request fail
        case actionTypes.REQUEST_FAIL: return requestFail(state, action);
        default:
            return state;
    }
}

export default reducer;