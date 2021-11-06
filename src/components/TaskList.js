import React from 'react'
import TaskListItem from './TaskListItem'

export default function TaskList({ tasks, restartTask, connectorName }) {
    return (
        <div className="container max-w-3xl">
            <div className="py-0">
                <div className="py-0 overflow-x-auto ">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        worker
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        state
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, index) =>
                                    <TaskListItem key={index} task={task} restartTask={restartTask} connectorName={connectorName}/>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
