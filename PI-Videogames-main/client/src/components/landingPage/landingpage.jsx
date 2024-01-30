import React from 'react';
import { Link } from 'react-router-dom';
import imagen from '../../IMG/2022-king-kratos-god-of-war-ragnarok-video-game-wallpaper-3554x1999_53.jpg';
import './landingpage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <img src={imagen} alt="foto" className="imagen-landing" />
      <div className="button-container">
        <Link to="/home">
          <button className="video-games-button">START GAME</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
