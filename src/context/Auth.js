import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext([{}, () => { }])

const AuthProvider = (props) => {
  const [state, setState] = useState({ loading: true, token: null });
  return (
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  );
}


const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth }