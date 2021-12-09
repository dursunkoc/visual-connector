import React from 'react'

export default function Header() {
    return (
        <div className="text-3xl shadow bg-gradient-to-r from-indigo-300 to-indigo-900">
                <nav className="flex justify-between w-screen text-gray">
                    <div className="flex items-center w-full px-5 py-6 xl:px-12">
                        <a className="flex items-center font-bold font-heading w-max" href="/">
                            <img className="h-12" src="logo.png" alt="visual connect logo"/>
                            <span className="flex text-blue-900">Visual Connect</span>
                        </a>
                    </div>
                </nav>
        </div>
    )
}
