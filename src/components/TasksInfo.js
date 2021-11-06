import React, { useState } from 'react'
import TaskIcon from './icons/task.svg'
import TaskDetail from './TasksDetail'

export default function TasksInfo({ connectorName, tasks, restartTask, numberOfRunningTasks, numberOfFailedTasks }) {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <div className="flex items-center">
                <button className="flex items-center p-3 leading-none text-gray-600 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none" onClick={() => setShowModal(true)}>
                    <img className="h-4" src={TaskIcon} alt="task" />
                </button>

                <div className="ml-2 text-sm leading-none text-gray-600">
                    {numberOfRunningTasks > 0 && <p>{numberOfRunningTasks} tasks running.</p>}
                    {numberOfFailedTasks > 0 && <p className="bg-red-400 w-max" >{numberOfFailedTasks} tasks failed.</p>}
                </div>
                {showModal && <TaskDetail setShowModal={setShowModal} restartTask={restartTask} connectorName={connectorName} tasks={tasks}/>}

            </div>
        </div>
    )
}
