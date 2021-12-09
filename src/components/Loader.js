import React from 'react'

export default function Loader() {

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-transparent outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-0">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none focus:outline-none"></div>
                <div
                    className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin"
                ></div>
            </div>
            <div className="fixed inset-0 z-30 bg-black opacity-25"></div>
        </div>
    );
}
