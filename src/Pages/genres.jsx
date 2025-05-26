import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";

function Genres() {
    const [page, setPage] = useState(1)
    const [animes, setAnimes] = useState([])

    useEffect(() => {
        const fetchTopAnimes = async () => {
            await getPopularAnimes({
                set: (newAnimes) => setAnimes((prev) => [...prev, ...newAnimes]),
                page
            })
        }

        fetchTopAnimes()
    }, [page])

    return (
        <div className="flex flex-col items-center justify-center bg-[#121212] w-full min-h-screen">
            <div className="flex justify-start items-start max-w-[1037px] w-full mb-2">
                <h1 className="text-white text-3xl font-extrabold">Top Anime Series</h1>
            </div>
            <div className="grid grid-cols-[75px_645px_97px_97px_123px] text-white text-center">
                <div className="titulo-card-animes">
                    <h1>Rank</h1>
                </div>
                <div className="titulo-card-animes">
                    <h1>Title</h1>

                </div>
                <div className="titulo-card-animes">
                    <h1>Score</h1>
                </div>
                <div className="titulo-card-animes">
                    <h1>Your score</h1>
                </div>
                <div className="titulo-card-animes">
                    <h1>Status</h1>
                </div>
                {
                    animes.length > 0 && animes.map((anime, index) => (
                        <React.Fragment key={index}>
                            <div className="titulo-card-animes flex items-center justify-center">
                                <h1>{index + 1}</h1>
                            </div>
                            <div className="titulo-card-animes flex items-start py-3 px-2 gap-3">
                                <div>
                                    <img src={anime.images?.jpg.image_url} alt="" className="max-w-[70px] max-h-[90px] w-full h-full object-cover"/>
                                </div>
                                <div className="text-left">
                                    <h1 className="text-[14px] -mt-1">{anime.title}</h1>
                                    <h1 className="detalhes-animes">{anime.type}({anime.episodes})</h1>
                                    {anime?.aired.string && <h1 className="detalhes-animes">{anime.aired.string}</h1>}
                                    
                                </div>
                            </div>
                            <div className="titulo-card-animes flex items-center justify-center">
                                <h1>{anime.score}</h1>
                            </div>
                            <div className="titulo-card-animes flex items-center justify-center">
                                <h1>N/A</h1>
                            </div>
                            <div className="titulo-card-animes flex items-center justify-center">
                                <h1>Add to my list</h1>
                            </div>

                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default Genres;