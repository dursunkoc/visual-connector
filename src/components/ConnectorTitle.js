import React, { useContext, useState } from 'react'
import { Context } from "../Store"
import ConnectorRepo from './ConnectorRepo'
import ToogleCheck from './ToogleCheck'

export default function ConnectorTitle() {
    const [state, setState] = useContext(Context)
    const [connectorRepoOpen, setConnectorRepoOpen] = useState(false)

    const showConnectorRepo = () => {
        setConnectorRepoOpen(true)
    }

    const logout = () => {
        setState(state => ({ ...state, token: '' }))
        localStorage.removeItem('token')
        localStorage.removeItem('kafkaConnectServer')
    }

    return (
        <div className="p-2">
            <div className="inline-flex items-center p-2 text-sm leading-none text-indigo-600 bg-white rounded-full shadow text-teal">
                <span className="inline-flex px-2">Connectors from</span>

                <button className="inline-flex items-center justify-center h-6 px-3 text-white transition bg-indigo-600 rounded-full"
                >{state.kafkaConnectServer}</button>
                <div className="ml-10">
                    <ToogleCheck label="AutoRefresh"/>
                </div>
                <div className="ml-10">
                <button className="inline-flex items-center justify-center h-6 px-3 text-white transition bg-indigo-600 rounded-full hover:bg-indigo-300"
                    onClick={showConnectorRepo}
                >Connector Repository</button>
                {connectorRepoOpen && <ConnectorRepo setShowModal={setConnectorRepoOpen}/>}
                </div>
                <div className="ml-10">
                <span className="inline-flex px-2">User: admin</span>
                <button className="inline-flex items-center justify-center h-6 px-3 text-white transition bg-indigo-600 rounded-full hover:bg-indigo-300"
                    onClick={logout}
                >Logout</button>
                </div>
            </div>
        </div>
    )
}
