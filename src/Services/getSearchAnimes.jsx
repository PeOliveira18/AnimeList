export const getSearchAnimes = async ({search, set}) => {
    try{
        const res = await fetch(`https://api.jikan.moe/v4/top/anime?q=${search}`)
        const data = await res.json()
        set(data.data)
    }catch (error){
        console.log(error);
    }
}