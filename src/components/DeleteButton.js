import React from 'react'
import DeleteIcon from './icons/delete.svg'

export default function DeleteButton({ onDeleteConnector, connector }) {
    return (
        <button className="items-center hidden p-3 leading-none text-red-600 bg-red-100 rounded lg:flex focus:outline-none hover:bg-red-200" onClick={() => { onDeleteConnector(connector.name) }}>
            <img className="h-4 mr-1" src={DeleteIcon} alt="delete" />
            <p className="text-sm">Delete</p>
        </button>
    )
}
