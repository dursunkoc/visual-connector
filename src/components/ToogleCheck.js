import React, { useContext } from 'react'
import { Context } from '../Store'

export default function ToogleCheck({ label }) {
    const [state, setState] = useContext(Context)
    const toogleChange = (e) => {
        setState({ ...state, autoRefreshEnabled: e.target.checked })
    }
    return (
        <div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" name="toggle" id="Blue" className="absolute block w-6 h-6 duration-200 ease-in bg-white border-4 rounded-full outline-none appearance-none cursor-pointer checked:bg-indigo-500 focus:outline-none right-4 checked:right-0" checked={state.autoRefreshEnabled} onChange={toogleChange} />
                <label htmlFor="Blue" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                </label>
            </div>
            <span className={`font-medium ${state.autoRefreshEnabled ? "text-indigo-500":"text-gray-400"}`}>
                AutoRefresh
            </span>
        </div>
    )
}
