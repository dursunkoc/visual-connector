import React, { useState, useContext } from "react";
import Alert from "./Alert";
import { Context } from "../Store"

export default function UrlEditor({ setShowModal }) {
    const [state, setState] = useContext(Context)
    const [showAlert, setShowAlert] = useState(false)

    const urlChange = (value) => {
        setUrl(value)
    }
    const [urlValue, setUrl] = useState(state.kafkaConnectUrl)

    const saveKafkaConnectUrl = () => {
        //TODO check url if not valid alert 
        if (!validateURL(urlValue)) {
            setShowAlert(true)
        } else {
            setState({ ...state, kafkaConnectUrl: urlValue })
            setShowModal(false)
        }
    }

    const validateURL = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i');
        return pattern.test(str);
    }

    return (
        <>
            <div
                className="fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto max-w-3xl mx-auto my-0">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-1 bg-gray-500 border-b border-solid rounded-t border-blueGray-200">
                            <h3 className="p-1 text-xl font-semibold text-black ">
                                Change Kafka Connect Url
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

                        <div className="items-center px-5 py-3 mx-auto my-auto ">
                            <input className="w-auto p-3 text-gray-800 border-2 border-blue-500 max-w-max rounded-xl focus:ring-0 focus:outline-none" value={urlValue} onChange={(e) => { urlChange(e.target.value) }} />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-4 border-t border-solid rounded-b border-blueGray-200">
                            <button
                                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                type="button"
                                onClick={() => setShowModal(false)}>
                                Close
                            </button>
                            <button
                                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-green-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                type="button"
                                onClick={() => saveKafkaConnectUrl()}>
                                Save
                            </button>
                        </div>
                        {showAlert ? (<Alert setShowAlert={setShowAlert} message={"Please provide a valid url!"} />) : null}
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-30 bg-black opacity-25"></div>
        </>
    );
}