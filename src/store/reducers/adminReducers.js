const initialState = {
    isAuthenticated: false,
    token : localStorage.getItem('token'),
}

const adminReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS': {
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                ...action.payload.data,
                token: action.payload.data.token,
                isAuthenticated: true
            };
        };
        case 'LOGOUT_SUUCCESS' : {
            localStorage.removeItem('token')
            return {
                token: null,
                isAuthenticated: false,
              };
        };
        default :  return state
        
    }
}

export default adminReducer