import React, { useContext, useState } from 'react'
import { Context } from '../Store'

export default function ConnectorFilter() {
    const filterAllTerm = "";
    const filterSinksTerm = "sink";
    const filterSourceTerm = "source";
    const notSelected = "text-gray-600 rounded-full hover:text-indigo-700 hover:bg-indigo-100"
    const selected = "text-indigo-700 bg-indigo-100 rounded-full"

    const [state, setState] = useContext(Context)
    const [allSelected, setAllSelected] = useState(selected)
    const [sinkSelected, setSinkSelected] = useState(notSelected)
    const [sourceSelected, setSourceSelected] = useState(notSelected)

    const onSelectAll = () =>{
        setState({ ...state, connectorFilter: filterAllTerm})
        setAllSelected(selected)
        setSinkSelected(notSelected)
        setSourceSelected(notSelected)
    }

    const onSelectSink = () =>{
        setState({ ...state, connectorFilter: filterSinksTerm})
        setAllSelected(notSelected)
        setSinkSelected(selected)
        setSourceSelected(notSelected)
    }

    const onSelectSource = () =>{
        setState({ ...state, connectorFilter: filterSourceTerm})
        setAllSelected(notSelected)
        setSinkSelected(notSelected)
        setSourceSelected(selected)
    }

    return (
        <div className="flex items-center">
            <button onClick={onSelectAll}>
                <div className={`px-8 py-2 ${allSelected}`}>
                    <p>All</p>
                </div>
            </button>
            <button onClick={onSelectSink}>
                <div className={`px-8 py-2 ml-4 ${sinkSelected}`}>
                    <p>Sinks</p>
                </div>
            </button>
            <button  onClick={onSelectSource}>
                <div className={`px-8 py-2 ml-4 ${sourceSelected}`}>
                    <p>Sources</p>
                </div>
            </button>
        </div>
    )
}
