import React from 'react';
import './App.css';
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from './screens/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Dashboard></Dashboard>
    </AuthProvider>
  );
}

export default App;
