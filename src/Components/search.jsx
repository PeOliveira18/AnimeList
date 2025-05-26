import { useState, useEffect } from "react";
import { getSearchAnimes } from "../Services/getSearchAnimes";
import React from "react";
import Header from "./header";

function Search({name, fetchFunction}) {
    const [search, setSearch] = useState("");
    const [filteredAnimes, setFilteredAnimes] = useState([]);
    

    useEffect(() => {
            const timeout = setTimeout(() => {
                const fetchSearchResults  = async () => {
                    if (search.trim() === "") {
                        setFilteredAnimes([]);
                        return;
                    }
        
                    try {
                        const result = await fetchFunction(search);
                        setFilteredAnimes(result);
                    } catch (error) {
                        console.log("Erro na busca:", error);
                    }
                };
        
                fetchSearchResults();
            }, 500);
        
            return () => clearTimeout(timeout); 
        }, [search]);

    return {
        search,
        setSearch,
        filteredAnimes,
        showFiltered: search.trim() !== "",
        header: <Header search={search} setSearch={setSearch} name={name} />,
    }
}

export default Search;