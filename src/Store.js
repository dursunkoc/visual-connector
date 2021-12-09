import React, {useState} from 'react';

var defaultUrl;
try{
    defaultUrl = window.location.href.substring(0,window.location.href.indexOf(':',7,3))+":8083";
}catch{
    defaultUrl = "http://localhost:8083";
}

const initialState = {
    kafkaConnectUrl: defaultUrl,//'http://localhost:8083',
    connectorFilter: "",
    autoRefreshEnabled: false,
    connectors: []
}


export const Context = React.createContext();

const Store = ({children}) =>{
    const [state, setState] = useState(initialState);


    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )
}

export default Store;
