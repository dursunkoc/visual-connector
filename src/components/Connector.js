import SinkLogo from './icons/sink.svg'
import SourceLogo from './icons/source.svg'
import DeleteIcon from './icons/delete.svg'

import OfflineIcon from './icons/offline.svg'
import OnlineIcon from './icons/online.svg'

import PauseIcon from './icons/pause.svg'
import PlayIcon from './icons/play.svg'

import OracleConnectorIcon from './icons/connector/OracleConnector.png'
import JdbcConnectorIcon from './icons/connector/JdbcConnector.png'
import TasksInfo from './TasksInfo'
import ConnectorEditorButton from './ConnectorEditorButton'


export default function Connector({ connector, status, onUpdateConnector, onPauseConnector, onResumeConnector, onDeleteConnector, restartTask }) {
    //const hasError = connector.tasks.filter(t=>t.trace).length
    const numberOfFailedTasks = status.tasks.filter(t => t.trace).length
    const numberOfRunningTasks = status.tasks.length - numberOfFailedTasks
    const connectorClass = connector.config["connector.class"]
    const onPauseResume = () => {
        if (status.connector.state === 'RUNNING') {
            onPauseConnector(connector.name)
        } else {
            onResumeConnector(connector.name)
        }
    }

    return (
        <>
            <tr className="h-16 border border-gray-100 rounded">
                <td>
                    <div className="flex items-center pl-3 w-max">
                        {connectorClass.toLowerCase().includes("oracle") &&
                            <img className="h-5" src={OracleConnectorIcon} alt="oracle-connector" />}
                        {connectorClass.toLowerCase().includes("jdbc") &&
                            <img className="h-5" src={JdbcConnectorIcon} alt="oracle-connector" />}
                    </div>
                </td>
                <td>
                    <div className="flex items-center pl-3">
                        <p className="mr-2 text-base font-medium leading-none text-gray-700">{connector.name}</p>
                    </div>
                </td>
                <td className="pl-5">
                    <div className="flex items-center">
                        {connector.type === 'sink' ?
                            <img className="h-4" src={SinkLogo} alt="sink" />
                            :
                            <img className="h-4" src={SourceLogo} alt="source" />}
                        <p className="ml-2 text-sm leading-none text-gray-600">{connector.type}</p>
                    </div>
                </td>
                <td>
                    <div className={`flex items-center p-3 w-max ${status.connector.state === 'RUNNING' ? 'text-green-900' : 'text-red-500'}`}>
                        {status.connector.state === 'RUNNING' ?
                            <img className="h-5" src={OnlineIcon} alt="online" />
                            :
                            <img className="h-5" src={OfflineIcon} alt="offline" />}
                    </div>
                </td>
                <td>
                    <div className="flex items-center pr-5">
                        <button className="flex items-center p-3 leading-none bg-blue-100 rounded hover:bg-blue-200 focus:outline-none w-max" onClick={onPauseResume}>
                            {status.connector.state === 'RUNNING' ?
                                <>
                                    <img className="h-6" src={PauseIcon} alt="pause" />
                                    <p className="w-10 ml-1 text-sm">Pause</p>
                                </>
                                :
                                <>
                                    <img className="h-6" src={PlayIcon} alt="play" />
                                    <p className="w-10 ml-1 text-sm">Run</p>
                                </>}

                        </button>
                    </div>
                </td>
                <td className="pl-4">
                    <TasksInfo connectorName={connector.name}
                        tasks={status.tasks}
                        restartTask={restartTask}
                        numberOfRunningTasks={numberOfRunningTasks}
                        numberOfFailedTasks={numberOfFailedTasks} />
                </td>
                <td className="pl-5">
                    <ConnectorEditorButton connector={connector} onUpdateConnector={onUpdateConnector} />
                </td>
                <td className="pl-5">
                    <button className="flex items-center p-3 leading-none text-red-600 bg-red-100 rounded focus:outline-none hover:bg-red-200" onClick={() => { onDeleteConnector(connector.name) }}>
                        <img className="h-4 mr-1" src={DeleteIcon} alt="delete" />
                        <p className="text-sm">Delete</p>
                    </button>
                </td>
            </tr>
            <tr className="h-2" />
        </>
    )
}
