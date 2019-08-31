// Context is designed to share data that can be considered “global” for a tree of React components, 
// such as the current authenticated user, theme, or preferred language
import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null 
}

// Check if token expired
if(localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken;
    }
}

const authReducer = (state, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                user: action.payload
            }

        case 'USER_LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem("jwtToken", userData.token);

        dispatch({
            type: 'USER_LOGIN',
            payload: userData
        })
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");

        dispatch({
            type: 'USER_LOGOUT'
        })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props} 
        />
    )
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});



export { AuthContext, AuthProvider }
