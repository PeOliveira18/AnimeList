import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";

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
        <div>
            {popularAnimes.map(anime => (
                <h1 key={anime.mal_id}>{anime.title}</h1>
            ))}
            {loadingMore ? "Carregar mais" : "Carregando..."}
        </div>
    );
}

export default Popular;