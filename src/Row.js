import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl]= useState('');
    //using snippet of code which will run on a basic condtion
    useEffect(() => {
        //if [],run once when the row loads ,and don't run it again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

    }, [fetchUrl]);

    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        },
    };

    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.name||movie?.title||movie?.original_name||movie?.original_title)
            .then(url=>{
                const urlParams= new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    };

    

    console.log(movies);

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row__posters'>
                {movies.map(movie => (
                    <img
                     key={movie.id}
                     className={`row__poster  ${isLargeRow && "row__posterLarge"}`} 
                     src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                     alt={movie.name} 

                     />
                ))}
            </div>
           {trailerUrl && <YouTube videoID={trailerUrl} opts={opts} controls={true}/>}
        </div>
    )
}

export default Row