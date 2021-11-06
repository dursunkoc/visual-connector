import React, { useContext } from "react";
import ConnectorTitle from "./ConnectorTitle";
import ConnectorFilter from "./ConnectorFilter";
import AddConnector from "./AddConnector"
import Connector from "./Connector";
import { Context } from "../Store"

function Connectors({ onUpdateConnector, onAddConnector, onPauseConnector, onResumeConnector, onDeleteConnector, restartTask }) {
  const [state] = useContext(Context)

  return (
    <>
      <div className="w-full sm:px-6">
        <ConnectorTitle />
        <div className="px-4 py-4 bg-white md:py-7 md:px-8 xl:px-10">
          <div className="items-center justify-between sm:flex">
            <ConnectorFilter />
            <AddConnector onAddConnector={onAddConnector} />
          </div>
          <div className="overflow-x-auto mt-7">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {state.connectors.filter(connector => state.connectorFilter === "" || connector.info.type === state.connectorFilter).map(
                  (connector, index) =>
                    <Connector key={index} connector={connector.info} status={connector.status}
                      onUpdateConnector={onUpdateConnector}
                      onPauseConnector={onPauseConnector}
                      onResumeConnector={onResumeConnector}
                      onDeleteConnector={onDeleteConnector}
                      restartTask={restartTask} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>
        {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
      </style>
    </>
  );
}

export default Connectors;
