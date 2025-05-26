import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";
import { getSearchAnimes } from "../Services/getSearchAnimes";
import { AppContainer } from "../App";
import ContainerCardAnimes from "../Components/containerCardAnimes";
import Header from "../Components/header";
import Search from "../Components/search";
import { useScroll } from "../Components/handleScroll";

function Popular() {
    const { search, setSearch, filteredAnimes, showFiltered, header } = Search({
        name: "Animes Populares",
        fetchFunction: getSearchAnimes,
    })

    const [popularAnimes, setPopularAnimes] = useState([]);
    const [allAnimes, setAllAnimes] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const maxPage = 1156;


    useEffect(() => {
        if (search.trim() !== "") return;
        const fetchAnimes = async () => {
            setLoadingMore(true);
            await getPopularAnimes({
                set: (newAnimes) =>
                    setPopularAnimes((prev) => [...prev, ...newAnimes]),
                page,
            });
            setLoadingMore(false);
        };

        fetchAnimes();
    }, [page, search]);


    useScroll({search, page, setPage, maxPage, loadingMore})

    
    const animesExibidos = showFiltered ? filteredAnimes : popularAnimes;

    return (
        <AppContainer>
            {header}
            <div className="flex justify-around px-5">
                <ContainerCardAnimes popularAnimes={animesExibidos} />
            </div>
            {loadingMore && !showFiltered && (
                <div className="flex justify-center w-full py-5">
                    <h1 className="text-[#91A7FF] font-medium text-5xl">Carregando...</h1>
                </div>
            )}
        </AppContainer>
    );
}

export default Popular;
