import React from "react";

function CardAnimes({title, image}) {
    return (  
        <div className="flex flex-col gap-3">
            <h1>{title}</h1>
            <img src={image} alt={`Foto de ${title}`} className="w-[225px] h-[318px] object-cover"/>
            <button className="px-3 py-2 bg-[#4B0082] rounded-[10px] shadow-sm cursor-pointer hover:opacity-50 text-white">Saiba mais</button>
        </div>
    );
}

export default CardAnimes;