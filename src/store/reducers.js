import * as actionTypes from './actions';

const today = new Date();

const initialState = {
    username: localStorage.getItem("username") ? localStorage.getItem("username") : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    error: null,
    loading: false,
    year: today.getFullYear(),
    month: (today.getMonth()+1),
    day: today.getDate(),
}

const dateReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return {
            ...state,
            error: null,
            loading: true
        }
        case actionTypes.AUTH_SUCCESS: return {
            ...state,
            token : action.token,
            username: action.username,
            error: null,
            loading: false
        }
        case actionTypes.AUTH_FAIL: return {
            ...state,
            error: action.error,
            loading: false
        }
        case actionTypes.AUTH_LOGOUT: return {
            ...state,
            token: null,
            username: null
        }
        case actionTypes.SET_YEAR: return {
            ...state,
            year: action.year
        }
        case actionTypes.SET_MONTH: return {
            ...state,
            month: action.month
        }
        case actionTypes.SET_DAY: return {
            ...state,
            day: action.day
        }
        default: return state
    }
}

export default dateReducer;