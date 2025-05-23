import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";
import { getMovieDetails } from "../Services/getMovieDetails";
import { Link, useParams } from "react-router";


function AnimeDetails() {
    const [anime, setAnime] = useState({})
    const { id } = useParams()
    const [mostrarMais, setMostrarMais] = useState(false)

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
        <div className="flex relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${anime.images?.jpg?.large_image_url})` }}>
            <div className="flex flex-col justify-center gap-y-10 items-center bg-black/70  w-full px-14 ">
                <h1 className="text-gradient mt-10 animate-gradient">
                    {anime.title}
                </h1>
                <div className="relative p-[3px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:300%_300%] animate-gradient">
                    <div className="flex flex-col bg-blue-50 rounded-xl w-full max-w-6xl h-fit py-5 px-5 shadow-2xl font-extrabold text-gray-950">
                        <div className="w-full flex md:items-start items-center md:flex-row flex-col md:gap-50 gap-2 mt-8">
                            <img
                                className="w-full max-w-xs md:max-w-[355px] object-cover rounded-xl"
                                src={anime.images?.jpg.image_url}
                                alt={anime.title}
                            />
                            <div className="flex flex-col gap-y-6 w-full ">
                                {anime?.aired?.string && <h1>Aired: {anime.aired.string}</h1>}
                                <h1>Indicacao: {anime.rating}</h1>
                                <h1>Rank: {anime.rank}</h1>
                                <h1>Nota: {anime.score}</h1>
                                <h1>Popularidade: {anime.popularity}</h1>
                                <h1>Estudio: {anime.studios?.map((estudio) => estudio.name)}</h1>
                                <h1>Status: {anime.status}</h1>
                                <h1>Source: {anime.source}</h1>
                                <h1>Episodios: {anime.episodes}</h1>
                                <h1>Season: {anime.season}</h1>
                                <h1>
                                    Genero: {anime.genres?.map((genero) => genero.name).join(', ')}
                                </h1>
                            </div>
                        </div>
                        <div className="flex mt-7">
                            <h1>
                                {mostrarMais ? anime.synopsis : `${anime.synopsis?.substring(0, 255)}...`}
                                <span className="ml-2">
                                    <button onClick={() => setMostrarMais(!mostrarMais)} className="text-gradient text-[16px] cursor-pointer">
                                        {mostrarMais ? 'Show Less' : 'Show More'}
                                    </button>
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
                <h1 className="text-gradient mt-12  animate-gradient">Trailer</h1>
                {anime.trailer?.youtube_id ? (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:300%_300%] animate-gradient w-full max-w-4xl mx-auto">
                        <div className="aspect-video w-full rounded-lg overflow-hidden">
                            <iframe className="w-full h-full"
                                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                                title={`${anime.title} Trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ) : (
                    <h1>Trailer não divulgado</h1>
                )}
                <Link to='/Popular' className="mb-5 w-full flex justify-center">
                    <button className="bg-fuchsia-700 rounded-[8px] px-3 py-2 font-extrabold cursor-pointer w-full max-w-xs">Voltar</button>
                </Link>
            </div>

        </div>


    );
}

export default AnimeDetails;