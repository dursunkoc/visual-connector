import { useCallback, useContext, useEffect, useState } from "react";
import Connectors from "../components/Connectors";
import Loader from '../components/Loader';
import Header from "../components/Header";
import { Context } from '../Store'
import Alert from "../components/Alert";
import useInterval from "../hooks/interval";
import KafkaConnectService from '../services/kafkaconnect.service'

export default function VisualConnector() {
  const [state, setState] = useContext(Context)
  const [showAddConnectorSuccessAlert, setShowAddConnectorSuccessAlert] = useState(false)
  const [showAddConnectorFailureAlert, setShowAddConnectorFailureAlert] = useState(false)

  const [showRestartTaskSuccessAlert, setShowRestartTaskSuccessAlert] = useState(false)
  const [showRestartTaskFailureAlert, setShowRestartTaskFailureAlert] = useState(false)

  const logout = useCallback(() => {
    setState(state => ({ ...state, token: '' }))
    localStorage.removeItem('token')
    localStorage.removeItem('kafkaConnectServer')
  }, [setState])

  const checkAuth = (statusCode, elseFn) => {
    if ([401, 403].includes(statusCode)) {
      logout()
    } else {
      elseFn()
    }
  }

  const onUpdateConnector = async (connectorStr) => {
    const name = connectorStr.name
    setState(st => ({ ...st, loading: true }))
    try {
      await fetch('/connector-repo/save-connector', {
        method: 'POST',
        headers: {
          'x-access-token': state.token,
        },
        body: JSON.stringify(connectorStr)
      });

      await fetch(`/kafka-connect/connectors/${name}/config`, {
        method: 'PUT',
        headers: {
          'x-access-token': state.token,
          'x-kafka-connect-server': state.kafkaConnectServer,
        },
        body: JSON.stringify(connectorStr)
      })

      let [data, statusCode] = await KafkaConnectService.fetchConnectors(state.token, state.kafkaConnectServer)
      checkAuth(statusCode, () => { setState({ ...state, connectors: data }) })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const onAddConnector = async (connectorJson) => {
    setState(st => ({ ...st, loading: true }))
    try {
      await fetch('/connector-repo/save-connector', {
        method: 'POST',
        headers: {
          'x-access-token': state.token,
        },
        body: JSON.stringify(connectorJson)
      });

      const resp = await fetch(`/kafka-connect/connectors`, {
        method: 'POST',
        headers: {
          'x-access-token': state.token,
          'x-kafka-connect-server': state.kafkaConnectServer,
        },
        body: JSON.stringify(connectorJson)
      })
      const addedConnectorData = await resp.json()

      if (addedConnectorData.name) {
        setShowAddConnectorSuccessAlert(true)
      } else {
        setShowAddConnectorFailureAlert(true)
      }
      let [data, statusCode] = await KafkaConnectService.fetchConnectors(state.token, state.kafkaConnectServer)
      checkAuth(statusCode, () => { setState({ ...state, connectors: data }) })
    } catch (error) {
      console.error(error);
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const onDeleteConnector = async (name) => {
    setState(st => ({ ...st, loading: true }))
    try {
      await fetch(`/kafka-connect/connectors/${name}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': state.token,
          'x-kafka-connect-server': state.kafkaConnectServer,
        },
      })
      let [data, statusCode] = await KafkaConnectService.fetchConnectors(state.token, state.kafkaConnectServer)
      checkAuth(statusCode, () => { setState({ ...state, connectors: data }) })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const onPauseConnector = async (name) => {
    setState(st => ({ ...st, loading: true }))
    try {
      await fetch(`/kafka-connect/connectors/${name}/pause`, {
        method: 'PUT',
        headers: {
          'x-access-token': state.token,
          'x-kafka-connect-server': state.kafkaConnectServer,
        },
      })
      let [data, statusCode] = await KafkaConnectService.fetchConnectors(state.token, state.kafkaConnectServer)
      checkAuth(statusCode, () => { setState({ ...state, connectors: data }) })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const onResumeConnector = async (name) => {
    setState(st => ({ ...st, loading: true }))
    try {
      await fetch(`/kafka-connect/connectors/${name}/resume`, {
        method: 'PUT',
        headers: {
          'x-access-token': state.token,
          'x-kafka-connect-server': state.kafkaConnectServer,
        },
      })
      let [data, statusCode] = await KafkaConnectService.fetchConnectors(state.token, state.kafkaConnectServer)
      checkAuth(statusCode, () => { setState({ ...state, connectors: data }) })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }

  const restartTask = async (connectorName, task) => {
    const restartResp = await fetch(`/kafka-connect/connectors/${connectorName}/tasks/${task.id}/restart`, {
      method: 'POST',
      headers: {
        'x-access-token': state.token,
        'x-kafka-connect-server': state.kafkaConnectServer,
      },
    }
    )

    const restartStatus = restartResp.status

    if (restartStatus <= 300 && restartStatus >= 200) {
      setShowRestartTaskSuccessAlert(true);
    } else {
      setShowRestartTaskFailureAlert(true);
    }

    let [data, statusCode] = await KafkaConnectService.fetchConnectors(state.token, state.kafkaConnectServer)
    checkAuth(statusCode, () => { setState({ ...state, connectors: data }) })
  }

  useInterval(async () => {
    if (!state.autoRefreshEnabled) {
      return
    }
    setState(st => ({ ...st, loading: true }))
    try {
      let [data, statusCode] = await KafkaConnectService.fetchConnectors(state.token, state.kafkaConnectServer)
      checkAuth(statusCode, () => { setState({ ...state, connectors: data }) })
    } finally {
      setState(st => ({ ...st, loading: false }))
    }
  }, 5000);

  useEffect(() => {
    let cancel = false;

    const getConnectors = async () => {
      if (cancel) return;
      setState(st => ({ ...st, loading: true }))
      let [data, statusCode] = await KafkaConnectService.fetchConnectors(state.token, state.kafkaConnectServer)

      if ([401, 403].includes(statusCode)) {
        logout()
      } else {
        setState(st => ({ ...st, connectors: data, loading: false }))
      }
    }

    if (state.token && state.kafkaConnectServer) {
      getConnectors()
    }
    return () => {
      cancel = true;
    }
  }, [setState, state.kafkaConnectServer, state.token, logout])

  return (
    <section className="absolute w-full h-full">
      <div className="absolute top-0 w-full h-full bg-indigo-100">
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
    </section>
  );
}
