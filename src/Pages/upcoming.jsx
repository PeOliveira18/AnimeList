import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import ContainerCardAnimes from "../Components/containerCardAnimes";
import { getAnimeUpcoming } from "../Services/getAnimeUpcoming";
import { useScroll } from "../Components/handleScroll";

function Upcoming() {
    const [animesUpcoming, setAnimesUpcoming] = useState([])
    const [allAnimes, setAllAnimes] = useState([]);
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [search, setSearch] = useState("")
    const maxPage = 26

    useEffect(() => {
        const fetchAnimesUpcoming = async () => {
            if (search.trim() !== "" ) return
            setLoadingMore(true)
            await getAnimeUpcoming({
                set: (newAnimes) => setAnimesUpcoming((prev) => [...prev, ...newAnimes]),
                api: `https://api.jikan.moe/v4/seasons/upcoming?page=${page}`
            })
            setLoadingMore(false)
        }

        fetchAnimesUpcoming()
    },[page, search])

    useScroll({search, page, setPage, maxPage, loadingMore})

    useEffect(() => {
            const timeout = setTimeout(() => {
                const fetchSearchAnimes = async () => {
                    if (search.trim() === "") {
                        setAllAnimes([]);
                        return;
                    }
    
                    try {
                        const result = await getAnimeUpcoming(search);
                        setAllAnimes(result);
                    } catch (error) {
                        console.log("Erro na busca:", error);
                    }
                };
    
                fetchSearchAnimes();
            }, 500);
    
            return () => clearTimeout(timeout);
        }, [search]);
    
        const animesExibidos = search.trim() === "" ? animesUpcoming : allAnimes;

    return (  
        <div>
            <Header name={"Upcoming Animes"} search={search} setSearch={setSearch}/>
            <div className="flex justify-around px-5">
                <ContainerCardAnimes popularAnimes={animesUpcoming}/>
            </div>
        </div>
    );
}

export default Upcoming;