export const getPopularAnimes = async({set, page}) => {
    fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
    .then(response => response.json())
    .then(data => set(data.data))
    .catch(error => console.log(error))
    .finally(() => console.log('Fetch atualizado')
    )

}