import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {

    return (
        <div className={props.theme}>
            <header>
                <nav className="flex flex-wrap items-center justify-between w-full py-2 md:py-3 px-4 text-lg fixed top-0 z-50 text-white bg-black/60 backdrop-blur-xl border-b border-cyan-500/60 body-font">
                    <Link to='/' className="flex title-font font-semibold items-center text-white my-1 md:mb-0">
                        <img src="/killertune.png" className='h-8 w-8 rounded-xl object-cover' alt="KillerTune logo" />
                        <span className="hidden ml-3 text-xl md:inline-block tracking-wide">KillerTune</span>
                    </Link>

                    <svg xmlns="http://www.w3.org/2000/svg" id="menu-button" onClick={() => document.getElementById("menu").classList.toggle('hidden')} className="h-6 w-6 cursor-pointer md:hidden block"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>

                    <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                        <ul className=" pt-4 space-y-3 md:space-y-0 text-base md:flex md:justify-between  md:pt-0">

                            <li>
                                <Link to="/" className="mr-5 hover:text-cyan-400 cursor-pointer" onClick={() => document.getElementById("menu").classList.toggle('hidden')}>Home
                                </Link>
                            </li>
                            <hr className='border-cyan-700/40' />
                            <li>
                                <Link to="/search" className="mr-5 hover:text-cyan-400 cursor-pointer" onClick={() => document.getElementById("menu").classList.toggle('hidden')}>Search
                                </Link>
                            </li>
                            <hr className='border-cyan-700/40' />
                            <li>
                                <Link to='/about' className="mr-5 hover:text-cyan-400 cursor-pointer" onClick={() => document.getElementById("menu").classList.toggle('hidden')} >About</Link>
                            </li>
                            <hr className='border-cyan-700/40' />
                            <li>
                                <Link to='/terms' className="mr-5 hover:text-cyan-400 cursor-pointer" onClick={() => document.getElementById("menu").classList.toggle('hidden')}>Terms of Use</Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </header>
        </div >
    )
}

export default NavBar
