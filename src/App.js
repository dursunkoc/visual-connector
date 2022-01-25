import React, { useContext, useEffect } from 'react';
import VisualConnector from "./pages/VisualConnector.page";
import Login from "./pages/Login.page";
import { Context } from './Store'

function App() {
  const [state, setState] = useContext(Context);

  const logout = () => {
    setState(state => ({ ...state, token: '' }))
    localStorage.removeItem('token')
    localStorage.removeItem('kafkaConnectServer')
}

  useEffect(() => {
    let token = localStorage.getItem('token')
    let kafkaConnectServer = localStorage.getItem('kafkaConnectServer')
    if (token) {
      setState(state => ({ ...state, token: token, kafkaConnectServer: kafkaConnectServer }))
    }
  }, [setState]);

  try{
    if (!state.token && !localStorage.getItem('token')) {
      return <Login />
    }
    return (<VisualConnector />)
  }catch{
   logout() 
  }
}

export default App;
