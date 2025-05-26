export async function getAnimeUpcoming({set,api}){
    try {
        const response = await fetch(api);
        const data = await response.json();

        const animes = data.data || []
        set(animes)
    } catch (error) {
        console.log("Erro ao buscar animes airing:", error);
    }
}