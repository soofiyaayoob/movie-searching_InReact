import React,{useState} from "react";

const[ishovered,setIshovered]=useState(false);
function MovieCard({movie}) {
    return ( 
    <div className={`movie-card ${isHovered ? 'hovered' : ''}`}
    onMouseEnter={()=>setIshovered(true)}
    onMouseLeave{()=>setIshovered(false)}
    >
        <div className="movie-poster" style={{backgroundImage:'url(${movie.poster-path})'}}></div>


    </div>
   );
}

export default MovieCard;