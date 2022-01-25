import React, { useState } from "react";
import Alert from "./Alert";

export default function ConnectorEditor({ setShowModal, connector, onSaveConnector }) {
    const [showAlert, setShowAlert] = useState(false)
    const connectorChange= (value) =>{
        setConnectorStr(value)
    }

    const saveConnector= (value)=> {
        if (!connectorStr){
            setShowAlert(true)//("Please insert a valid Connector definition!")
        }else{
        try {
            const connectorJson = JSON.parse(connectorStr)
            onSaveConnector(connectorJson)
            setConnectorStr("")
            setShowModal(false)
        } catch (error) {
            setShowAlert(true)//("Please insert a valid Connector definition!")
        }}
    }
    const existingConnector = connector ? JSON.stringify(connector.config, (k, v) => k === "tasks" || k === "type" ? undefined : v, 2):""
    const [connectorStr, setConnectorStr] = useState(existingConnector)

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
                                Edit Connector
                            </h3>
                            <button
                                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                onClick={() => setShowModal(false)}>
                                <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        
                        <div className="relative flex-auto px-3 py-1 pb-10">
                            <textarea readOnly={onSaveConnector?false:true}
                                className="block w-full mt-1 text-gray-900 border-2 border-green-600 outline-none form-textarea focus:outline-none opacity-4"
                                rows="12" cols="88"
                                placeholder="Enter Connector configuration."
                                value={connectorStr} onChange={e=>connectorChange(e.target.value)}
                            />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-4 border-t border-solid rounded-b border-blueGray-200">
                            <button
                                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                type="button"
                                onClick={() => setShowModal(false)}>
                                Close
                            </button>
                            {onSaveConnector &&
                            <button
                                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-green-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                type="button"
                                onClick={() => saveConnector()}>
                                Save
                            </button>}
                        </div>
                        {showAlert ? (<Alert setShowAlert={setShowAlert} message={"Please insert a valid Connector definition!"}/>) : null}
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-30 bg-black opacity-25"></div>
        </>
    );
}