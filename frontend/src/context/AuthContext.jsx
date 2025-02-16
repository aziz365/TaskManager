import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.accessToken);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.accessToken,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
