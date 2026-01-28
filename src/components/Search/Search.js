import React, { useState } from 'react'
// import Player from './Player'
import Results from './Results'
import SearchBox from './SearchBox'

function Search(props) {
    const [query, setQuery] = useState(null)



    return (
        <div className={props.theme}>
            <section className="text-white bg-gradient-to-b from-black via-black to-black body-font pt-24 pb-16 border-t border-cyan-500/40 min-h-[100vh]">
                <div className="container px-5 mx-auto">
                    {!query && <SearchBox setQuery={setQuery} setProgress={props.setProgress} />}
                    {query && <Results query={query} setProgress={props.setProgress} setDetails={props.setDetails} setAlbumId={props.setAlbumId} setPlaylistId={props.setPlaylistId} />}
                </div>
            </section>
        </div>
    )
}

export default Search
