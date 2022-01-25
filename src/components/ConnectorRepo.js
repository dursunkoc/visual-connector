import React, { useEffect, useState, useContext, useCallback } from "react";
import RepoConnectorItem from "./RepoConnectorItem";
import { Context } from '../Store'

export default function ConnectorRepo({ setShowModal }) {
    const [state, setState] = useContext(Context)
    const [connectors, setConnectors] = useState([])
    const logout = useCallback(() => {
        setState(state => ({ ...state, token: '' }))
        localStorage.removeItem('token')
        localStorage.removeItem('kafkaConnectServer')
    }, [setState])

    useEffect(() => {
        let cancel = false
        const getConnectors = async () => {
            if (cancel) return
            let res = await fetch('/connector-repo/connectors', {
                headers: {
                    'x-access-token': state.token
                }
            })
            if ([401, 403].includes(res.status)) {
                logout()
            } else {
                setConnectors(res.json())
            }
        }

        getConnectors()
        return () => {
            cancel = true
        }
    }, [state.token, logout])

    return (
        <>
            <div
                className="fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto max-w-3xl mx-auto my-0">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 bg-gray-500 border-b border-solid rounded-t border-blueGray-200">
                            <h3 className="text-2xl font-semibold text-gray-900">
                                Saved Connectors
                            </h3>
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto px-3 py-1 pb-10">
                            <table className="block w-full whitespace-nowrap">
                                <tbody>
                                    {!connectors ? '' : connectors.map(
                                        (connector, index) =>
                                            <RepoConnectorItem key={index} connectorName={connector} />
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-4 border-t border-solid rounded-b border-blueGray-200">
                            <button
                                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-30 bg-black opacity-25"></div>
        </>
    );
}