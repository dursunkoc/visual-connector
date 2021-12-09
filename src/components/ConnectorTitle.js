import React, { useContext, useState } from 'react'
import { Context } from "../Store"
import ToogleCheck from './ToogleCheck'
import UrlEditor from './UrlEditor'

export default function ConnectorTitle() {
    const [state] = useContext(Context)
    const [editing, setEditing] = useState(false)
    const editKafkaConnectUrl = () => {
        setEditing(true)
    }

    return (
        <div className="p-2">
            <div className="inline-flex items-center p-2 text-sm leading-none text-indigo-600 bg-white rounded-full shadow text-teal">
                <span className="inline-flex px-2">Connectors from</span>

                <button className="inline-flex items-center justify-center h-6 px-3 text-white transition bg-indigo-600 rounded-full hover:bg-indigo-300"
                    onClick={editKafkaConnectUrl}
                >{state.kafkaConnectUrl}</button>
                <div className="ml-10">
                    <ToogleCheck label="AutoRefresh"/>
                </div>
                {editing && <UrlEditor setShowModal={setEditing}/>}
            </div>
        </div>
    )
}
