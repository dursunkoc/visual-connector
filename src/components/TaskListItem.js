import React, { useState } from 'react'
import RestartIcon from './icons/restart.svg'
import ErrorIcon from './icons/error.svg'
import ErrorDetail from './ErrorDetail'

export default function TaskListItem({ task, restartTask, connectorName }) {
    const [showErrorTrace, setShowErrorTrace] = useState(false)
    const showErrorDetails = () => {
        setShowErrorTrace(true)
    }

    return (
        <tr className={`${task.trace ? "bg-red-300" : "bg-white"} `}>
            <td className="px-5 py-5 text-sm border-b ">
                <div className="flex items-center">
                    <div>
                        <p className="text-gray-900 whitespace-no-wrap">
                            {task.worker_id}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 text-sm border-b ">
                <div className="flex items-center">
                    <p className="mr-2 text-gray-900 whitespace-no-wrap">
                        {task.state}
                    </p>
                    {task.trace &&
                        <>
                            <button className="flex items-center leading-none bg-transparent rounded focus:outline-none w-max" onClick={()=>restartTask(connectorName, task)}>
                                <img className="h-6" src={RestartIcon} alt="restart" />
                            </button>

                            <button className="flex items-center leading-none bg-transparent rounded focus:outline-none w-max" onClick={showErrorDetails}>
                                <img className="h-6" src={ErrorIcon} alt="restart" />
                            </button>
                        </>
                    }
                </div>
                {showErrorTrace && <ErrorDetail setShowModal={setShowErrorTrace} errorTrace={task.trace} />}
            </td>
        </tr>
    )
}
