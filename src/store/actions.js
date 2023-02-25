import axiosInstance from "../axios";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const SET_YEAR = 'SET_YEAR';
export const SET_MONTH = 'SET_MONTH';
export const SET_DAY = 'SET_DAY';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};
  
export const authSuccess = (username, token) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        username: username
    };
};
  
export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("expirationDate");
    return {
        type: AUTH_LOGOUT
    };
};
  
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};
  
export const authLogin = (username, password) => {
    return dispatch => {
      dispatch(authStart());
      axiosInstance
        .post(`token/`, {
          username: username,
          password: password
        })
        .then(res => {
          const access_token = res.data.access;
          const refresh_token = res.data.refresh;
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("username", username);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(authSuccess(username, access_token));
          dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
          dispatch(authFail(err));
        });
    };
  };

export function setYear(year) {
    return {
        type: SET_YEAR,
        year: year
    }
};

export function setMonth(month) {
    return {
        type: SET_MONTH,
        month: month
    }
};

export function setDay(day) {
    return {
        type: SET_DAY,
        day: day
    }
};