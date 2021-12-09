import { useContext, useEffect, useState } from "react";
import Connectors from "./components/Connectors";
import Loader from './components/Loader';
import Header from "./components/Header";
import { Context } from './Store'
import Alert from "./components/Alert";
import useInterval from "./hooks/interval";


function App() {
  const [state, setState] = useContext(Context)
  const [showAddConnectorSuccessAlert, setShowAddConnectorSuccessAlert] = useState(false)
  const [showAddConnectorFailureAlert, setShowAddConnectorFailureAlert] = useState(false)

  const [showRestartTaskSuccessAlert, setShowRestartTaskSuccessAlert] = useState(false)
  const [showRestartTaskFailureAlert, setShowRestartTaskFailureAlert] = useState(false)

  const fetchConnectors = async (url) => {
    try {
      const res = await fetch(`${url}/connectors?expand=info&expand=status`)
      const data = await res.json()

      return (Object.entries(data).map(o => o[1]).sort((a, b) => a.info.name > b.info.name ? 1 : -1))
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const onUpdateConnector = async (connectorStr) => {
    const name = connectorStr.name
    setState(st => ({ ...st, loading: true }))
    try {
      console.log(`updating connector: ${name}, with: ${JSON.stringify(connectorStr)}`);
      let updated = await fetch(`${state.kafkaConnectUrl}/connectors/${name}/config`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(connectorStr)
      })
      console.log(`response: ${JSON.stringify(updated)}`)
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const onAddConnector = async (connectorJson) => {
    setState(st => ({ ...st, loading: true }))
    try {
      const resp = await fetch(`${state.kafkaConnectUrl}/connectors`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(connectorJson)
      })
      const addedConnectorData = await resp.json()
      if (addedConnectorData.name) {
        setShowAddConnectorSuccessAlert(true)
      } else {
        setShowAddConnectorFailureAlert(true)
      }
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } catch (error) {
      console.error(error);
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const onDeleteConnector = async (name) => {
    setState(st => ({ ...st, loading: true }))
    try {
      await fetch(`${state.kafkaConnectUrl}/connectors/${name}`, { method: 'DELETE' })
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const onPauseConnector = async (name) => {
    setState(st => ({ ...st, loading: true }))
    try {
      await fetch(`${state.kafkaConnectUrl}/connectors/${name}/pause`, { method: 'PUT' })
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const onResumeConnector = async (name) => {
    setState(st => ({ ...st, loading: true }))
    try {
      await fetch(`${state.kafkaConnectUrl}/connectors/${name}/resume`, { method: 'PUT' })
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }


  const restartTask = async (connectorName, task) => {
    const restartResp = await fetch(`${state.kafkaConnectUrl}/connectors/${connectorName}/tasks/${task.id}/restart`, { method: 'POST' })

    const restartStatus = restartResp.status

    if (restartStatus <= 300 && restartStatus >= 200) {
      setShowRestartTaskSuccessAlert(true);
    } else {
      setShowRestartTaskFailureAlert(true);
    }

    let data = await fetchConnectors(state.kafkaConnectUrl)
    setState({ ...state, connectors: data })
  }

  useInterval(async () => {
    if (!state.autoRefreshEnabled) {
      return
    }
    setState(st => ({ ...st, loading: true }))
    try {
      console.log(`updating data ${new Date()}`);
      let data = await fetchConnectors(state.kafkaConnectUrl)

      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading: false }))
      console.log(`updated data ${new Date()}`);
    }
  }, 5000);


  useEffect(() => {
    const getConnectors = async () => {
      setState(st => ({ ...st, loading: true }))
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState(st => ({ ...st, connectors: data, loading: false }))
    }
    getConnectors()
  }, [state.kafkaConnectUrl, setState])

  return (
    <div>
      {state.loading && <Loader />}
      <Header />
      {showAddConnectorSuccessAlert ? (<Alert setShowAlert={setShowAddConnectorSuccessAlert} message={"Successfully added connector"} />) : null}
      {showAddConnectorFailureAlert ? (<Alert setShowAlert={setShowAddConnectorFailureAlert} message={"Operation Failed check kafka-connect logs!"} />) : null}

      {showRestartTaskSuccessAlert ? (<Alert setShowAlert={setShowRestartTaskSuccessAlert} message={"Successfully triggered restart"} />) : null}
      {showRestartTaskFailureAlert ? (<Alert setShowAlert={setShowRestartTaskFailureAlert} message={"Failed to trigger restart please check Kafka Connect logs."} />) : null}
      <Connectors
        onUpdateConnector={onUpdateConnector}
        onAddConnector={onAddConnector}
        onPauseConnector={onPauseConnector}
        onResumeConnector={onResumeConnector}
        onDeleteConnector={onDeleteConnector}
        restartTask={restartTask}
      />
    </div>
  );
}

export default App;
