import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";
import { getSearchAnimes } from "../Services/getSearchAnimes";
import { AppContainer } from "../App";
import ContainerCardAnimes from "../Components/containerCardAnimes";
import Header from "../Components/header";

function Popular() {
    const [popularAnimes, setPopularAnimes] = useState([]);
    const [allAnimes, setAllAnimes] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [search, setSearch] = useState("");
    const limite = 1156;

    // Busca os animes populares ao carregar ou mudar de página
    useEffect(() => {
        const fetchAnimes = async () => {
            if (search.trim() !== "") return; // Não carregar mais populares se estiver buscando
            setLoadingMore(true);
            await getPopularAnimes({
                set: (newAnimes) =>
                    setPopularAnimes((prev) => [...prev, ...newAnimes]),
                page: page,
            });
            setLoadingMore(false);
        };
        fetchAnimes();
    }, [page, search]);

    // Scroll infinito apenas se estiver vendo os populares
    useEffect(() => {
        const handleScroll = () => {
            if (
                search.trim() === "" &&
                window.innerHeight + document.documentElement.scrollTop >=
                    document.documentElement.offsetHeight &&
                page <= limite
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingMore, search, page]);

    // Buscar animes com base no que foi digitado
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
        }, 500); // Espera 500ms após parar de digitar
    
        return () => clearTimeout(timeout); // Cancela chamadas antigas
    }, [search]);

    // Decide o que exibir
    const animesExibidos = search.trim() === "" ? popularAnimes : allAnimes;

    return (
        <AppContainer>
            <Header search={search} setSearch={setSearch} />
            <div className="flex justify-around px-5">
                <ContainerCardAnimes popularAnimes={animesExibidos} />
            </div>
            {loadingMore && search.trim() === "" && (
                <div className="flex justify-center w-full py-5">
                    <h1 className="text-[#91A7FF] font-medium text-5xl">Carregando...</h1>
                </div>
            )}
        </AppContainer>
    );
}

export default Popular;
