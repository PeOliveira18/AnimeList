import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import { getAnimesAiring } from "../Services/getAnimeAiring";
import { getSearchAnimes } from "../Services/getSearchAnimes"; 
import ContainerCardAnimes from "../Components/containerCardAnimes";
import { useScroll } from "../Components/handleScroll";


function Airing() {
    const [animeAiring, setAnimeAiring] = useState([]);
    const [allAnimes, setAllAnimes] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const maxPage = 8;

    useEffect(() => {
        const fetchAnimesAiring = async () => {
            if (search.trim() !== "") return;
            setLoadingMore(true);
            await getAnimesAiring({
                set: (newAnimes) =>
                    setAnimeAiring((prev) => [...prev, ...newAnimes]),
                api: `https://api.jikan.moe/v4/seasons/now?page=${page}`
            });
            setLoadingMore(false);
        };

        fetchAnimesAiring();
    }, [page, search]);

    useScroll({search, page, setPage, maxPage, loadingMore})

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fetchSearchAnimes = async () => {
                if (search.trim() === "") {
                    setAllAnimes([]);
                    return;
                }

                try {
                    const result = await getSearchAnimes(search);
                    setAllAnimes(result);
                } catch (error) {
                    console.log("Erro na busca:", error);
                }
            };

            fetchSearchAnimes();
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    const animesExibidos = search.trim() === "" ? animeAiring : allAnimes;

    return (
        <div>
            <Header name={"Airing animes"} search={search} setSearch={setSearch} />
            <div className="flex justify-around px-5">
                <ContainerCardAnimes popularAnimes={animesExibidos} />
            </div>
            {loadingMore && search.trim() === "" && (
                <div className="flex justify-center w-full py-5">
                    <h1 className="text-[#91A7FF] font-medium text-5xl">Carregando...</h1>
                </div>
            )}
        </div>
    );
}

export default Airing;
