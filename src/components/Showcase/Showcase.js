import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import Heading from './Heading'
import Songs from './Songs'
import Albums from './Albums'
import Playlists from './Playlists';


function Showcase(props) {

    const navigate = useNavigate(); //for navigating to /listen

    const [trending_songs, setTrendingSongs] = useState([])
    const [trending_albums, setTrendingAlbums] = useState([])

    const [top_albums, setTopAlbums] = useState([])

    const [playlists, setPlaylists] = useState([])
    const [charts, setCharts] = useState([])

    const searchFromId = async (id) => {
        let raw_resp = await fetch(`https://jiosaavn-api-codyandersan.vercel.app/songs?id=${id}`)
        let resp = await raw_resp.json()
        props.setDetails(resp.data[0])
        navigate("/listen")
    }

    /**
     * Main function that fetches homepage API sets the homepage data
     */
    const setHomepageData = async () => {
        let uri = "https://jiosaavn-api-codyandersan.vercel.app/modules?language=hindi"

        props.setProgress(30)
        let data = await fetch(uri)
        props.setProgress(50)

        let resp = await data.json()
        props.setProgress(70)

        //Trending songs:
        setTrendingSongs(getShowcase(resp["data"]["trending"]["songs"], "song"))

        //Trending albums:
        setTrendingAlbums(getShowcase(resp["data"]["trending"]["albums"], "album"))

        //Top albums:
        setTopAlbums(getShowcase(resp["data"]["albums"], "album"))

        //Playlists:        
        setPlaylists(getShowcase(resp["data"]["playlists"], "playlist"))

        //Charts:
        setCharts(getShowcase(resp["data"]["charts"], "playlist"))

        props.setProgress(100)
    }

    /**
     * Helper function for shuffling the array of songs/albums
     * @param {array} array Array of song/album to be shuffled
     * @returns shuffled array
     */
    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    /**
     * Takes a list of songs/albums and returns it in the form of showcase
     * @param {Array} data The array of songs/albums of which to get the showcase
     * @param {String} type The type of data (song/album/playlist), so as to avoid different type being displayed with another type of data
     * @returns the name, image, id of the data
     */
    const getShowcase = (data, type) => {
        let data_showcase = []
        let count = 0
        while (count < 10) {
            if (data_showcase.length === 4) break
            // if song index exists:    
            if (data[count] && data[count].type == type) {
                let data_name = data[count]["name"] ? data[count]["name"] : data[count]["title"]
                data_showcase.push({
                    name: data_name,
                    image: data[count]["image"][2]["link"],
                    id: data[count]["id"]
                })
            }
            count += 1
        }
        return shuffle(data_showcase)

    }


    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0; //scroll to top of page
        document.title = "Popular Now - TuneStation"
        setHomepageData()
    }, [])



    return (
        <div className={props.theme}>
            <section className="text-white bg-gradient-to-b from-black via-black to-black body-font pt-24 pb-16 border-t border-cyan-500/40">
                <div className="max-w-6xl mx-auto px-4 lg:px-8">
                    {/* Top hero like YT Music */}
                    <div className="flex flex-col lg:flex-row gap-8 mb-10">
                        <div className="flex-1 bg-white/5 dark:bg-white/5/80 rounded-3xl p-6 lg:p-8 backdrop-blur-xl border border-white/10 shadow-xl">
                            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-300 mb-2">For you</p>
                            <h1 className="text-3xl md:text-4xl font-semibold mb-6">Good evening</h1>
                            {trending_songs[0] && (
                                <div className="flex items-center gap-5">
                                    <img
                                        src={trending_songs[0].image}
                                        alt={trending_songs[0].name}
                                        className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover shadow-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-300 mb-1">Quick mix · Trending</p>
                                        <h2 className="text-lg md:text-xl font-semibold truncate">
                                            {trending_songs[0].name.replace(/&quot;/g, '"')}
                                        </h2>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button
                                                onClick={() => searchFromId(trending_songs[0].id)}
                                                className="inline-flex items-center px-4 py-2 rounded-full bg-white text-black text-sm font-medium shadow-md hover:bg-gray-100"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    className="w-4 h-4 mr-2"
                                                >
                                                    <path d="M5 3.87v16.26c0 .7.76 1.14 1.36.78l13.01-8.13a.9.9 0 000-1.54L6.36 3.09A.9.9 0 005 3.87z" />
                                                </svg>
                                                Play
                                            </button>
                                            <button
                                                onClick={() => searchFromId(trending_songs[0].id)}
                                                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20 hover:bg-white/15"
                                            >
                                                Radio
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right side column - quick picks list */}
                        <div className="w-full lg:w-[320px] xl:w-[360px] space-y-4">
                            <Heading title="Quick picks" />
                            <div className="mt-1 space-y-2 bg-white/5 rounded-3xl p-3 backdrop-blur-xl border border-white/10 max-h-[260px] overflow-y-auto hide-scrollbar">
                                {trending_songs.slice(1, 7).map((song) => (
                                    <button
                                        key={song.id}
                                        onClick={() => searchFromId(song.id)}
                                        className="w-full flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-white/10 text-left"
                                    >
                                        <img
                                            src={song.image}
                                            alt={song.name}
                                            className="w-10 h-10 rounded-xl object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {song.name.replace(/&quot;/g, '"')}
                                            </p>
                                            {song.artist && (
                                                <p className="text-xs text-gray-300 truncate">{song.artist}</p>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Rows like YT Music carousels */}
                    <div className="space-y-10">
                        <div>
                            <Heading title="Trending now" />
                            <Songs songs={trending_songs} searchFromId={searchFromId} />
                        </div>

                        <div>
                            <Heading title="Popular albums" />
                            <Albums albums={trending_albums} setAlbumId={props.setAlbumId} />
                        </div>

                        <div>
                            <Heading title="Editorial picks" />
                            <Albums albums={top_albums} setAlbumId={props.setAlbumId} />
                        </div>

                        <div>
                            <Heading title="Top charts" />
                            <Playlists playlists={charts} setPlaylistId={props.setPlaylistId} />
                        </div>

                        <div>
                            <Heading title="Made for you" />
                            <Playlists playlists={playlists} setPlaylistId={props.setPlaylistId} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Showcase
