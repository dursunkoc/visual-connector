import React, { useEffect, useState, useContext, useCallback } from 'react'


import OracleConnectorIcon from './icons/connector/OracleConnector.png'
import JdbcConnectorIcon from './icons/connector/JdbcConnector.png'
import ConnectorEditorButton from './ConnectorEditorButton'
import { Context } from '../Store'


export default function RepoConnectorItem({ connectorName }) {
    const [connector, setConnector] = useState(null)
    const [state, setState] = useContext(Context)

    const logout = useCallback(() => {
        setState(state => ({ ...state, token: '' }))
        localStorage.removeItem('token')
        localStorage.removeItem('kafkaConnectServer')
    }, [setState])

    useEffect(() => {
        let cancel = false
        const getConnector = async () => {
            if (cancel) return
            let res = await fetch(`/connector-repo/connectors/${connectorName}`, {
                headers: {
                    'x-access-token': state.token
                }
            })
            if ([401, 403].includes(res.status)) {
                logout()
            } else {
                let data = await res.json();
                setConnector(data)
            }
        }

        getConnector()
        return () => {
            cancel = true
        }
    }, [connectorName, state.token, logout])

    return (
        <>
            <tr className={"h-16 border border-gray-200 bg-white rounded"}>
                <td>
                    {connector == null ?
                        ''
                        :
                        <div className="items-center hidden pl-3 md:flex w-max">
                            {connector.config["connector.class"]?.toLowerCase().includes("oracle") &&
                                <img className="h-5" src={OracleConnectorIcon} alt="oracle-connector" />}
                            {connector.config["connector.class"]?.toLowerCase().includes("jdbc") &&
                                <img className="h-5" src={JdbcConnectorIcon} alt="jdbc-connector" />}
                        </div>
                    }
                </td>
                <td>
                    <div className="flex items-center pl-3">
                        <p className="mr-2 text-base font-medium leading-none text-gray-700">{connector?.name}</p>
                    </div>
                </td>
                <td className="pl-3">
                    <ConnectorEditorButton connector={connector} />
                </td>
            </tr>
            <tr className="h-2" />
        </>
    )
}
