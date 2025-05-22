import CardAnimes from "./cardAnimes";
import React from "react";

function ContainerCardAnimes({popularAnimes = []}) {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-32 py-10 max-w-[1400px]">
                    {
                        popularAnimes.length > 0 &&
                    popularAnimes.map((anime) => (
                        <div
                            
                            className="flex justify-center shadow-2xl border border-[#91A7FF] rounded-2xl w-full max-w-[400px] p-6 bg-white"
                        >
                            <CardAnimes
                                
                                title={anime.title}
                                image={anime.images?.jpg?.image_url}
                            />
                        </div>
                    ))
                    
                    
                }
                </div>
    );
}

export default ContainerCardAnimes;