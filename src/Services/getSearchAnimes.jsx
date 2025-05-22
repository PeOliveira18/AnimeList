export const getSearchAnimes = async (query) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await res.json();
    return data.data;
};
