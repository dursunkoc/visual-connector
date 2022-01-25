const KafkaConnectService = {
    fetchConnectors: async (token, kafkaConnectServer) => {
        try {
            const res = await fetch(`/kafka-connect/connectors`, {
                headers: {
                    'x-access-token': token,
                    'x-kafka-connect-server': kafkaConnectServer,
                }
            })
            const data = await res.json()

            return [Object.entries(data).map(o => o[1]).sort((a, b) => a.info.name > b.info.name ? 1 : -1), 
                res.status]
        } catch (error) {
            return []
        }
    }
}

export default KafkaConnectService
