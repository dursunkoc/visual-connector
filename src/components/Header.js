import React from 'react'

export default function Header() {
    return (
        <div className="text-3xl text-white shadow bg-gradient-to-r from-blue-600 to-gray-900">
                <nav className="flex justify-between w-screen text-gray">
                    <div className="flex items-center w-full px-5 py-6 xl:px-12">
                        <a className="flex items-center text-3xl font-bold font-heading w-max" href="/">
                            <img className="h-10" src="logo512.png" alt="visual connect logo" />
                            <span className="flex text-black-900">Visual Connect</span>
                        </a>
                    </div>
                </nav>
        </div>
    )
}
