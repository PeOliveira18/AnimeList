import React, { useEffect, useState } from "react";
import { getPopularAnimes } from "../Services/getPopularAnimes";
import CardAnimes from "../Components/cardAnimes";
import { AppContainer } from "../App";

function Popular() {
    const [popularAnimes, setPopularAnimes] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const limite = 1156;

    useEffect(() => {
        const fetchAnimes = async () => {
            setLoadingMore(true);
            await getPopularAnimes({
                set: (newAnimes) =>
                    setPopularAnimes((prev) => [...prev, ...newAnimes]),
                page: page,
            });
            setLoadingMore(false);
        };
        fetchAnimes();
    }, [page]);

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

    return (
        <AppContainer>
            <div className="flex justify-around px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-32 py-10 max-w-[1400px]">
                    {popularAnimes.map((anime) => (
                        <div
                            key={anime.mal_id}
                            className="flex justify-center shadow-2xl border border-[#91A7FF] rounded-2xl w-full max-w-[400px] p-6 cursor-pointer bg-white"
                        >
                            <CardAnimes
                                mal_id={anime.mal_id}
                                title={anime.title}
                                image={anime.images.jpg.image_url}
                                animePopular={popularAnimes}
                            />
                        </div>
                    ))}
                </div>
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
