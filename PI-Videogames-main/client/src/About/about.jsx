import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';
import imagen from '../IMG/fondo_control.jpg';
import imagen2 from '../IMG/WhatsApp Image 2024-01-12 at 01.08.12 (2).jpeg';

function About() {
  return (
    <div className="about-container">
      <Link to="/home">
        <button>Volver al Inicio</button>
      </Link>
      <img className="fondo1" src={imagen} alt="foto" />
      <div className="container">
        <div className="content">
          <img className="presentation" src={imagen2} alt="foto" />
          <h1>PI HENRY VIDEOGAMES 2024</h1>
          <h2>Estudiante: Mirko Miler </h2>
        </div>
      </div>
    </div>
  );
}

export default About;
