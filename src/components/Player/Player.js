import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Items from '../Items';

function Player(props) {
    // Download Functions 
    /**
     * Helper function for downloadSong
     * @param {} blob The blobURL of the song.
     * @param {string} filename The name with which to download the file.
     */
    const downloadBlob = (blob, filename) => {
        var a = document.createElement('a');
        a.download = filename;
        a.href = blob;
        document.body.appendChild(a);
        props.setProgress(90)
        a.click();
        a.remove();
        props.setProgress(100)
    }

    /**
     * Starts downloading the song from link sent in props.
     */
    const downloadSong = async () => {
        if (!confirm("Please confirm that you understand and agree not to distribute or share the song you are downloading, and not to engage in any form of piracy.\nPlease note that all rights of the song belong to the respective labels and/or JioSaavn, and Tunestation will not be responsible if you are found to be engaged in any form of piracy.\nBy proceeding with the download, you acknowledge and agree to these terms and those stated in the Terms of Use.")) return false

        props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')}...`)
        props.setProgress(10)

        const url = props.details.downloadUrl[4]["link"]

        const filename = props.details.name.replace(/&quot;/g, '"') + ` - ${props.details.primaryArtists.split(',')[0]}.m4a`



        const response = await fetch(url)

        props.setProgress(50)
        const blob = await response.blob()

        props.setProgress(70)
        let blobUrl = window.URL.createObjectURL(blob);
        downloadBlob(blobUrl, filename);

    }



    const navigate = useNavigate(); //for navigating to /search if details are not supplied

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [relatedSongs, setRelatedSongs] = useState([]);
    const audioRef = useRef(null);

    const fetchRelatedSongs = async () => {
        if (!props.details || !props.details.primaryArtists) return;
        try {
            const primaryArtist = props.details.primaryArtists.split(',')[0];
            const query = encodeURIComponent(primaryArtist.trim());
            const uri = `https://jiosaavn-api-codyandersan.vercel.app/search/all?query=${query}&page=1&limit=10`;
            props.setProgress(30);
            const response = await fetch(uri);
            props.setProgress(60);
            const resp = await response.json();
            props.setProgress(80);

            const songs = resp.data && resp.data.songs && resp.data.songs.results ? resp.data.songs.results : [];
            const filtered = songs.filter((song) => song.id !== props.details.id);
            setRelatedSongs(filtered.slice(0, 8));
            props.setProgress(100);
        } catch (e) {
            props.setProgress(100);
        }
    }

    const getSongDetails = async (songId) => {
        const uri = `https://jiosaavn-api-codyandersan.vercel.app/songs?id=${songId}`;
        props.setProgress(30);
        const data = await fetch(uri);
        props.setProgress(60);
        const resp = await data.json();
        props.setProgress(90);
        props.setProgress(100);
        return resp.data[0];
    }

    useEffect(() => {
        if (!props.details) {
            navigate("/search")
            return
        }
        document.title = `Playing ${props.details.name.replace(/&quot;/g, '"')} - KillerTune`
        const audio = audioRef.current;
        document.getElementById("player").scrollIntoView(true)
        audio.addEventListener('loadedmetadata', () => {
            setIsPlaying(true)
            setDuration(audio.duration);
            audio.play();
        });
        fetchRelatedSongs();

        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        });

        audio.addEventListener('ended', () => {
            setIsPlaying(false);
            setCurrentTime(0);
            audio.currentTime = 0;
        });

        return () => {
            audio.removeEventListener('loadedmetadata', () => { });
            audio.removeEventListener('timeupdate', () => { });
            audio.removeEventListener('ended', () => { });
        }
    }, []);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            document.title = `Paused ${props.details.name.replace(/&quot;/g, '"')} - KillerTune`
            audio.pause();
            setIsPlaying(false);
        } else {
            document.title = `Playing ${props.details.name.replace(/&quot;/g, '"')} - KillerTune`
            audio.play();
            setIsPlaying(true);
        }
    }

    const handleWaveSeek = (e) => {
        if (!duration) return;
        const audio = audioRef.current;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);
        const seekTime = duration * ratio;
        audio.currentTime = seekTime;
        setCurrentTime(seekTime);
    }

    const handlePrevious = () => {
        const audio = audioRef.current;
        audio.currentTime = 0;
        setCurrentTime(0);
    }

    const handleNext = () => {
        const audio = audioRef.current;
        audio.currentTime = 0;
        setCurrentTime(0);
    }

    const currentMins = Math.floor(currentTime / 60);
    const currentSecs = Math.floor(currentTime % 60);
    const durationMins = Math.floor(duration / 60);
    const durationSecs = Math.floor(duration % 60);

    const bars = Array.from({ length: 40 }, (_, i) => i);
    const progressPercent = duration ? (currentTime / duration) * 100 : 0;


    return (
        <>
            {/* Show player only if details are recieved */}
            {props.details && <div className={props.theme}>
                <section className="pt-28 pb-10 text-gray-100 bg-gradient-to-br from-black via-black to-black body-font px-4" id="player">
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start">
                            {/* Player card */}
                            <div className="w-full lg:flex-1 flex justify-center">
                                <div className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden">
                                    <div className="relative">
                                        <img
                                            id="thumbnail"
                                            className="w-full h-96 object-cover"
                                            src={props.details.image[2]["link"]}
                                        />
                                        <div
                                            className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-b from-transparent via-black/40 to-black/80 text-white backdrop-blur-sm">
                                            <h3 className="font-bold" id="songName">{props.details.name.replace(/&quot;/g, '"')}</h3>
                                            <p className="w-fit opacity-80" id="artists_marquee">{props.details.primaryArtists}</p>
                                        </div>
                                    </div>
                                    <audio ref={audioRef} src={props.details.downloadUrl[4]["link"]} />

                                    {/* Wave Progress Bar */}
                                    <div className="px-4 pt-4">
                                        <div
                                            className="wave-progress-track"
                                            onClick={handleWaveSeek}
                                        >
                                            {/* Animated gradient background */}
                                            <div className="wave-progress-bg animate-color-shift" />

                                            {/* Bars representing the waveform / progress */}
                                            <div className="wave-bars-container">
                                                {bars.map((bar) => {
                                                    const barPosition = (bar / bars.length) * 100;
                                                    const isActive = barPosition <= progressPercent;
                                                    return (
                                                        <div key={bar} className="wave-bar-wrapper">
                                                            <div
                                                                className={`wave-bar ${isActive ? 'wave-bar-active' : 'wave-bar-inactive'} animate-wave`}
                                                                style={{ animationDelay: `${bar * 80}ms` }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Thumb */}
                                            <div
                                                className="wave-thumb"
                                                style={{ left: `calc(${progressPercent}% - 6px)` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs font-semibold text-black dark:text-gray-200 px-4 py-3 bg-black/20 dark:bg-white/5 backdrop-blur-md">
                                        <div id="currentTime">
                                            {currentMins}:{currentSecs < 10 ? '0' : ''}{currentSecs}
                                        </div>

                                        {/* Controls  */}
                                        <div className="flex space-x-3 p-2">
                                            <button className="focus:outline-none" id="previous" onClick={handlePrevious}>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                                                    <line x1="5" y1="19" x2="5" y2="5"></line>
                                                </svg>
                                            </button>
                                            <button
                                                className="rounded-full w-12 h-12 flex items-center justify-center pl-0.5 ring-2 ring-white/80 dark:ring-white/90 bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white focus:outline-none hover:animate-pulse backdrop-blur-md"
                                                id="controlBtn"
                                                onClick={handlePlayPause}
                                            >
                                                {/* Play / Pause */}
                                                {isPlaying ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                            <button className="focus:outline-none" id="next" onClick={handleNext}>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="5 4 15 12 5 20 5 4"></polygon>
                                                    <line x1="19" y1="5" x2="19" y2="19"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        {/* End of Controls  */}

                                        <div id="endTime">
                                            {durationMins}:{durationSecs < 10 ? '0' : ''}{durationSecs}
                                        </div>
                                    </div>
                                    <ul className="text-xs sm:text-base divide-y divide-white/10 border-t border-white/20 cursor-default bg-black/20 dark:bg-white/5 backdrop-blur-md">
                                        <li className="flex items-center space-x-3">
                                            <button className="p-3 group focus:outline-none" id="favBtn">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                                </svg>
                                            </button>

                                            <div className="flex-1"></div>
                                            Download
                                            <button className="focus:outline-none pr-4 group" id="downloadBtn" onClick={downloadSong}>
                                                <svg
                                                    className="w-4 h-4 group-hover:dark:text-white group-hover:text-gray-800 "
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li className="h-auto text-right text-lg pt-2">
                                            <p className="pr-8 pb-2" id="copyrights_label">
                                                {props.details.copyright}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Related songs: below on mobile, right on larger screens */}
                            {relatedSongs && relatedSongs.length > 0 && (
                                <div className="mt-10 lg:mt-0 w-full lg:w-80 xl:w-96">
                                    <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/40 rounded-3xl shadow-2xl px-4 md:px-6 py-4 md:py-6">
                                        <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                                            More like this
                                            <span className="text-xs font-normal text-cyan-300">based on {props.details.primaryArtists.split(',')[0]}</span>
                                        </h2>
                                        <div className="flex flex-wrap -m-2">
                                            {relatedSongs.map((song) => (
                                                <Items
                                                    key={song.id}
                                                    song={song}
                                                    onClick={async () => {
                                                        if (!props.setDetails) return;
                                                        const details = await getSongDetails(song.id);
                                                        props.setDetails(details);
                                                        navigate("/listen");
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>}

        </>
    )
}

export default Player
