import React, { useState } from 'react'
import ConnectorEditor from './ConnectorEditor';

export default function AddConnector({ onAddConnector }) {
    const [showEditor, setShowEditor] = useState(false)

    const editConnector = () => {
        setShowEditor(true);
    }

    return (
        <>
            <button className="inline-flex items-start justify-start px-6 py-3 mt-4 bg-indigo-700 rounded sm:mt-0 hover:bg-indigo-600 focus:outline-none" onClick={editConnector}>
                <p className="text-sm font-medium leading-none text-white">Add Connector</p>
            </button>
            {showEditor && <ConnectorEditor setShowModal={setShowEditor} onSaveConnector={onAddConnector} />}

        </>
    )
}
