import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/nav';
import SearchBar from '../SearchBar/searchbar';
import Filter from '../Filter/filter';
import { connect } from 'react-redux';
import Pagination from '../Pagination/pagination';
import { getAllGames, getGenres } from '../../redux/Actions/actions';
import imagen3 from '../../IMG/god-ofwar-4-4k-m7.jpg';
import './videogames.css';


function Videogames({ allGames, getAllGames, getGenres }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(4);

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;

  const currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getAllGames();
    getGenres();
  }, [getAllGames, getGenres]);

  return (
    <div className="Principal-container">
      <Nav />
      <SearchBar />
      <Filter />
 
      <Pagination
        cardPerPage={cardPerPage}
        totalCards={allGames.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className="games-div">
        {currentCards.length > 0 ? (
          currentCards.map((game) => (
            <Link key={game.id} to={`/details/${game.id}`}>
              <div className="game-card">
                <h2>{game.name}</h2>
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="game-card-img"
                />
                <p>Rating: {game.rating}</p>
                <p>Genres: {game.genres.map((e, index) => (
                  <span key={e.id}>
                    {game.genres.length > (index + 1) ? `${e.name}, ` : `${e.name}.`}
                  </span>
                ))}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No hay juegos para mostrar.</p>
        )}
      </div>

      <Pagination
        cardPerPage={cardPerPage}
        totalCards={allGames.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <img src={imagen3} alt="Banner" className="banner-image" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allGames: state.filtered,
    searchResult: state.searchResult, 
  };
};

export default connect(mapStateToProps, { getAllGames, getGenres })(Videogames);

