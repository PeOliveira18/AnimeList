import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";
import { AppContainer } from "../App";
import ContainerCardAnimes from "../Components/containerCardAnimes";
import Header from "../Components/header";
import { getSearchAnimes } from "../Services/getSearchAnimes";

function Popular() {
    const [popularAnimes, setPopularAnimes] = useState([]);
    const [allAnimes, setAllAnimes] = useState([])
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [search, setSearch] = useState("")
    const limite = 1156;

    const getSearchAnimes = async () => {
        try{
            const res = await fetch(`https://api.jikan.moe/v4/top/anime?q=${search}`)
            const data = await res.json()
            setAllAnimes(data.data)
        }catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchAnimes = async () => {
            setLoadingMore(true)
            await getPopularAnimes({
                set: (newAnimes) =>
                    setPopularAnimes((prev) => [...prev, ...newAnimes]),
                page: page,
            });
            setLoadingMore(false)
        }
        fetchAnimes()
        getSearchAnimes()
    }, [page])

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight &&
                page <= limite
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingMore]);

    const animesFiltrados = 
    popularAnimes.filter(anime => 
        anime.title.toLowerCase().includes(search.toLocaleLowerCase())
    ) 


    return (
        <AppContainer>
            <Header search={search} setSearch={setSearch}/>
            <div className="flex justify-around px-5">
                <ContainerCardAnimes popularAnimes={animesFiltrados}/>
                {loadingMore && (
                    <div className="text-center w-full py-5 text-[#91A7FF] font-medium text-lg">
                        Carregando...
                    </div>
                )}
            </div>
        </AppContainer>
    );
}

export default Popular;
