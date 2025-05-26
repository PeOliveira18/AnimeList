
export const getAnimesAiring = async ({set, api}) => {
    try {
        const response = await fetch(api);
        const data = await response.json();
        set(data.data)
    } catch (error) {
        console.log("Erro ao buscar animes airing:", error);
    }
}