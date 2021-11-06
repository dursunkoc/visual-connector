import React from "react";

const Alert = ({ setShowAlert, message }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className={"text-white px-6 py-4 border-0 rounded flex relative mb-4 bg-blue-500"}>
                    <span className="inline-block mr-8 align-middle">
                        {message}
                    </span>
                    <button
                        className="absolute top-0 right-0 mt-4 mr-6 text-2xl font-semibold leading-none bg-transparent outline-none focus:outline-none"
                        onClick={() => setShowAlert(false)}>
                        <span>×</span>
                    </button>

                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    );
};

export default Alert;