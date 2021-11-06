import React, { useState } from 'react'
import EditIcon from './icons/edit.svg'
import ConnectorEditor from './ConnectorEditor'

export default function ConnectorEditorButton({ connector, onUpdateConnector }) {
    const [showEditor, setShowEditor] = useState(false)
    const editConnector = () => {
        setShowEditor(true);
    }

    return (
        <>
            <button className="flex items-center p-3 leading-none text-gray-600 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none" onClick={editConnector}>
                <img className="h-4 mr-1" src={EditIcon} alt="edit" />
                <p className="text-sm">Edit</p>
            </button>
            {showEditor && <ConnectorEditor setShowModal={setShowEditor} connector={connector} onSaveConnector={onUpdateConnector} />}
        </>
    )
}
