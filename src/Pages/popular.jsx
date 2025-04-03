import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";
import CardAnimes from "../Components/cardAnimes";

function Popular() {
    const [popularAnimes, setPopularAnimes] = useState([])
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const limite = 1156

    useEffect(() => {
        const fetchAnimes = async () => {
            setLoadingMore(true);
            getPopularAnimes({
                set: (newAnimes) => setPopularAnimes(prev => [...prev, ...newAnimes]),
                page: page
            });
            setLoadingMore(false);
        };
        fetchAnimes();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
                setPage(prevPage => prevPage + 1)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [loadingMore])
    
    return (  
        <div className="flex justify-around">
        <div className="grid grid-cols-3 gap-y-11 gap-x-56 py-10 px-5">
            {popularAnimes.map(anime => (
                <div className="flex text-center justify-center shadow-2xl shadow=[#FFFFFF] border-[1px] border-[#91A7FF] rounded-2xl w-full max-w-[400px] p-7 cursor-pointer">
                    <CardAnimes mal_id={anime.mal_id} title={anime.title} image={anime.images.jpg.image_url} animePopular={popularAnimes}/>
                </div>
            ))}
            {loadingMore ? "Carregar mais" : "Carregando..."}
        </div>
        </div>
    );
}

export default Popular;