import React, { createContext, useState } from 'react'

const AuthContext = createContext([{ token: localStorage.getItem("token") }, () => { }])

const AuthProvider = (props) => {
  const [state, setState] = useState({});
  return (
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider }