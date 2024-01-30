import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import './details.css';
import image5 from '../../IMG/f9b67166545aee0783359c566fab740c.gif';
import image6 from '../../IMG/c080dcea703b81541d3249204dcca513578068ee_00.gif';
import image6rep from '../../IMG/c080dcea703b81541d3249204dcca513578068ee_00.gif';
import image7 from '../../IMG/logo-demigod-armor-kratos-god-of-war-wallpaper-2560x1080_14.jpg';

function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState({});

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        console.log("Respuesta de getvideogame en detail:", response);

        if (response && response.data) {
          const data = response.data;

          setGame({
            id: data.id,
            name: data.name,
            background_image: data.background_image,
            rating: data.rating,
            genres: data.genres,
            releaseDate: data.released, // Utiliza la clave correcta para la fecha de lanzamiento
            description: data.description,
            platforms: data.platforms.map(platform => platform.platform.name), // Extrae los nombres de las plataformas
          });
        } else {
          setGame(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del juego:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={image6} alt='Kirby' className="kirby-image loading-gif2" />
        <img src={image5} alt='Cargando...' className="loading-gif1" />
        <img src={image6rep} alt='Kirby' className="kirby-image loading-gif3" />
      
      </div>
      
    );
  }
  
  

  if (!game) {
    return <div>No se encontró el juego.</div>;
  }

  return (
    <div className="game-details">
      <h2>{game.name}</h2>
      <img src={game.background_image} alt={game.name} className="game-details-img" />
      <p>Rating: {game.rating}</p>
      <p>Géneros: {game.genres.map((e, index) => (
        <span key={e.id}>
          {game.genres.length > (index + 1) ? `${e.name}, ` : `${e.name}.`}
        </span>
      ))}
      </p>
      <p>
        <strong>Fecha de lanzamiento</strong>: {game.releaseDate || 'None'}
      </p>
      {game.description && (
        <p>
          <strong>Descripción</strong>: {game.description.replace(/(<([^>]+)>)/gi, '')}
        </p>
      )}
      {game.platforms && (
        <p>
          <strong>Plataformas</strong>: {typeof game.platforms === 'string' ? game.platforms : game.platforms.join(', ')}
        </p>
      )}
      <div>  <img src={image7} alt='Kratos' className="kratos" /></div>
    </div>
   
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.allGames.games || [],
  };
};

export default connect(mapStateToProps)(Details);
