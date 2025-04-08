export const getPopularAnimes = ({ set, page }) => {
    return fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data.data)) {
                set(data.data);
            } else {
                console.warn("Formato inesperado da resposta:", data);
                set([]);
            }
        })
        .catch((error) => {
            console.error("Erro ao buscar animes populares:", error);
            set([]);
        })
        .finally(() => {
            console.log("Fetch atualizado");
        });
};
