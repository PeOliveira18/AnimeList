import { useEffect } from "react"

export const useScroll = ({search, page, setPage, maxPage, loadingMore}) => {
    useEffect(() => {
        const handleScroll =() => {
            const nearBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50;
            if (
                search.trim() === "" &&
                nearBottom &&
                !loadingMore &&
                page < maxPage
            ) {
                setPage((prev) => prev + 1);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [search, page, setPage, maxPage, loadingMore])
}