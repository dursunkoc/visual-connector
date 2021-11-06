import React from 'react'

export default function ErrorDetail({ setShowModal, errorTrace }) {
    return (
        <>
            <div
                className="fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto mx-auto my-0 max-w-max">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none max-w-max focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 bg-gray-500 border-b border-solid rounded-t border-blueGray-200">
                            <h3 className="text-2xl font-semibold">
                                Error Details
                            </h3>
                            <button
                                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="block w-6 h-2 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="px-3 py-1 pb-10 overflow-scroll">
                            <pre className="max-w-md text-xs max-h-80 md:max-w-2xl sm:max-w-xl lg:max-w-3xl ">{errorTrace}</pre>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-4 border-t border-solid rounded-b border-blueGray-200">
                            <button
                                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-30 bg-black opacity-25"></div>
        </>
    )
}
