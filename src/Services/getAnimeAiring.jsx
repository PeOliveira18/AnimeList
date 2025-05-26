
export async function getAnimesAiring({set, api}){
    try {
        const response = await fetch(api);
        const data = await response.json();

        const animes = Array.isArray(data.data) ? data.data : []
        set(animes)
    } catch (error) {
        console.log("Erro ao buscar animes airing:", error);
    }
}