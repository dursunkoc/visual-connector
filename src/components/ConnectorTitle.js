import React, { useContext, useState } from 'react'
import { Context } from "../Store"
import UrlEditor from './UrlEditor'

export default function ConnectorTitle() {
    const [state] = useContext(Context)
    const [editing, setEditing] = useState(false)
    const editKafkaConnectUrl = () => {
        setEditing(true)
    }

    return (
        <div class="p-2">
            <div class="inline-flex items-center bg-white leading-none text-indigo-600 rounded-full p-2 shadow text-teal text-sm">
                <span class="inline-flex px-2">Connectors from</span>

                <button class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center hover:bg-indigo-300 transition"
                    onClick={editKafkaConnectUrl}
                >{state.kafkaConnectUrl}</button>
                {editing && <UrlEditor setShowModal={setEditing}/>}
            </div>
        </div>
    )
}
