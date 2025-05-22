import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";
import { getMovieDetails } from "../Services/getMovieDetails";
import { useParams } from "react-router";


function AnimeDetails() {
    const [anime, setAnime] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const fetchAnimes = async () => {
            getMovieDetails({
                set: setAnime,
                api: `https://api.jikan.moe/v4/anime/${id}`
            })
        }

        fetchAnimes()
    }, [id])


    return (
        <div className="flex relative w-full min-h-screen bg-cover bg-center " style={{ backgroundImage: `url(${anime.images?.jpg?.large_image_url})` }}>
            <div className="flex flex-col justify-center gap-y-10 items-center bg-black opacity-70 w-full px-14 ">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-400 bg-clip-text text-transparent -mt-10">
                    {anime.title}
                </h1>
                <div className="relative p-[3px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:300%_300%] animate-gradient">
                    <div className="flex flex-col bg-blue-50 rounded-xl w-full max-w-6xl h-fit py-5 px-5 shadow-2xl font-extrabold text-gray-950">
                            <div className="flex md:flex-row flex-col md:gap-50 gap-2 items-start mt-8">
                                <img className="md:w-[355px] md:h-[418px] w-[455px] h-[518px]" src={anime.images?.jpg.image_url} alt={anime.title}/>
                                <div className="flex flex-col gap-y-5 ">
                                    {anime?.aired?.string && <h1>Aired: {anime.aired.string}</h1>}
                                    <h1>Indicacao: {anime.rating}</h1>
                                    <h1>Rank: {anime.rank}</h1>
                                    <h1>Nota: {anime.score}</h1>
                                    <h1>Popularidade: {anime.popularity}</h1>
                                    <h1>Status: {anime.status}</h1>
                                    <h1>Source: {anime.source}</h1>
                                </div>
                            </div>
                            <div className="flex mt-5"> 
                                <h1>{anime.synopsis}</h1>
                            </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AnimeDetails;