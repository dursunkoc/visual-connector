import React from 'react'
import PauseIcon from './icons/pause.svg'
import PlayIcon from './icons/play.svg'

export default function PauseRestartButton({status, onPauseResume}) {
    return (
        <div className="items-center hidden sm:flex">
            <button className="flex items-center p-3 leading-none bg-gray-100 rounded hover:bg-gray-200 focus:outline-none w-max" onClick={onPauseResume}>
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

    )
}
