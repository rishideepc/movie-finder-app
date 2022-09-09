import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

// API Key: 7ef847d7

const API_URL= 'http://www.omdbapi.com?apikey=7ef847d7';

const movie1={
    "Title": "The Batman",
    "Year": "2022",
    "imdbID": "tt1877830",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState([]);

    const SearchMovies = async (title) => {
       const response = await fetch(`${API_URL}&s=${title}`);
       const data = await response.json();
       
       setMovies(data.Search);
    }

    useEffect(() => {
        SearchMovies(searchTerm)


    }, []);


    return (
        <div className="app">
            <h1>MovieFinder</h1>
            <div className="search">
                <input
                    placeholder="Search Movies, Actors, Genres"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="Search"
                    onClick={()=>{SearchMovies(searchTerm)}}

                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {/* <MovieCard movie1={movies[0]}/> */}

                        {movies.map((movie)=>(
                            <MovieCard movie={movie}/> 
                        ))}
                    </div>
                ):(
                <div className="empty">
                    <h2>Oops! No movies found.</h2>
                </div>
                )
            }
            

        </div>

       
    );
}

export default App;