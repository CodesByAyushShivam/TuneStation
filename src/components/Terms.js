import React, { useEffect } from 'react'

function Terms(props) {

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.title = "Terms of Use - KillerTune"
    }, [])

    return (
        <div className={props.theme}>
            <div className="container px-5 pt-28 pb-10 mx-auto text-gray-700 dark:text-gray-400 body-font bg-light-100 dark:bg-deep-900 ">
                <div className="flex flex-col text-center w-full mb-10">
                    <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-black dark:text-white'>Terms of Use for KillerTune</h1>
                    <p className='text-lg sm:text-xl text-gray-900 dark:text-gray-100'>Welcome to KillerTune, an online music streaming and downloading platform built for the sole purpose of personal use and learning. By accessing or using KillerTune, you agree to be bound by these Terms of Use. If you do not agree to these Terms of Use, please <b>do not</b> use KillerTune.</p>
                </div>
                <hr />
                <br />
                <ul className='text-gray'>
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Personal Project:</span> KillerTune is a personal project created for the purpose of learning ReactJS. It is not intended to be monetized or used for any commercial purpose.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Personal Use Only:</span> KillerTune is provided for personal use only. You may use KillerTune to stream or download music for your own personal, non-commercial use.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Use of Unofficial JioSaavn API:</span> KillerTune uses <a href="https://github.com/sumitkolhe/jiosaavn-api" target="_blank" rel="noopener noreferrer" className='underline hover:text-black dark:hover:text-white'>Sumit Kolhe's Unofficial JioSaavn API</a>, which is available under the <b>MIT license</b>, which unofficially fetches the data directly from JioSaavn's website.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Prohibition on Sharing Material:</span> You agree not to share any music or other material you download from KillerTune with anyone else. Sharing copyrighted material without permission is illegal and can result in civil and criminal liability.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Ownership of data:</span> All the songs/albums/playlists displayed on this website belong to JioSaavn. We <b>do not intend</b> to infringe on any copyright, trademark, or other intellectual property rights of any third party. All rights to the music and other material available on KillerTune belong to <b>JioSaavn</b> and the respective song labels.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; No Piracy:</span> You agree not to use KillerTune to pirate music or engage in any other illegal activity.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; For JioSaavn and Copyright Owners:</span> In the event that JioSaavn or the copyright owners of the music available on KillerTune want the website to be taken down for any copyright infringement related case, they may raise an issue at the <a href="https://github.com/codyandersan/TuneStation" target="_blank" rel="noopener noreferrer" className='underline hover:text-black dark:hover:text-white'>KillerTune Git repository</a>. We will try our best to stop the functioning of this website as soon as possible.</li>
                </ul>

                <br/>
                <hr />
                <br />
                <p>By using KillerTune, you <b>agree</b> to comply with these Terms of Use. We reserve the right to modify or update these Terms of Use at any time without notice. If you continue to use KillerTune after any changes to the Terms of Use have been made, you agree to be bound by the revised Terms of Use.</p>
            </div>
        </div>
    )
}

export default Terms
