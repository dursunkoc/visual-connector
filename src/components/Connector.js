import SinkLogo from './icons/sink.svg'
import SourceLogo from './icons/source.svg'

import OfflineIcon from './icons/offline.svg'
import OnlineIcon from './icons/online.svg'

import OracleConnectorIcon from './icons/connector/OracleConnector.png'
import JdbcConnectorIcon from './icons/connector/JdbcConnector.png'
import TasksInfo from './TasksInfo'
import ConnectorEditorButton from './ConnectorEditorButton'
import DeleteButton from './DeleteButton'
import PauseRestartButton from './PauseRestartButton'


export default function Connector({ connector, status, onUpdateConnector, onPauseConnector, onResumeConnector, onDeleteConnector, restartTask }) {
    const hasError = status.tasks.filter(t=>t.trace).length
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
            <tr className={`h-16 border ${hasError?"border-red-400 bg-red-300":"border-gray-200 bg-white"} rounded`}>
                <td>
                    <div className="items-center hidden pl-3 md:flex w-max">
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
                <td>
                    <div className="items-center hidden md:flex min-w-max">
                        {connector.type === 'sink' ?
                            <img className="h-4" src={SinkLogo} alt="sink" />
                            :
                            <img className="h-4" src={SourceLogo} alt="source" />}

                    </div>
                </td>
                <td className="pl-3">
                    <div className={`hidden md:flex items-center p-3 w-max ${status.connector.state === 'RUNNING' ? 'text-green-900' : 'text-red-500'}`}>
                        {status.connector.state === 'RUNNING' ?
                            <img className="h-5" src={OnlineIcon} alt="online" />
                            :
                            <img className="h-5" src={OfflineIcon} alt="offline" />}
                    </div>
                </td>
                <td className="pl-3">
                    <PauseRestartButton status={status} onPauseResume={onPauseResume}/>
                </td>
                <td className="pl-3">
                    <TasksInfo connectorName={connector.name}
                        tasks={status.tasks}
                        restartTask={restartTask}
                        numberOfRunningTasks={numberOfRunningTasks}
                        numberOfFailedTasks={numberOfFailedTasks} />
                </td>
                <td className="pl-3">
                    <ConnectorEditorButton connector={connector} onUpdateConnector={onUpdateConnector} />
                </td>
                <td className="pl-3">
                    <DeleteButton />
                </td>
            </tr>
            <tr className="h-2" />
        </>
    )
}
