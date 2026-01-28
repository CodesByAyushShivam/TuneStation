import React from 'react'

function Footer(props) {
    return (
        <div className={props.theme}>
            <footer className="text-gray-300 bg-black body-font mt-auto border-t border-cyan-500/40">
                <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>

                        <span className="ml-3 text-xl">KillerTune</span>
                    </a>
                    <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-cyan-500/40 sm:py-2 sm:mt-0 mt-0">
                        Built
                        with ♥ by
                        <a href="https://codesbyayushshivam.github.io/" className="text-cyan-400 ml-1" target="_blank"
                            rel="noopener noreferrer">@codesbyayushshivam</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
