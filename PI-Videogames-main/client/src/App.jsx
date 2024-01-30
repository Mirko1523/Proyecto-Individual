// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LandingPage from './components/landingPage/landingpage';
import './App.css';
import About from './About/about';
import Videogames from './components/Videogames/videogames';
import Details from './components/Details/details';
import CrearVideogame from './components/CrearVideogame/crearvideogame'


function App() {

  return (
    <Provider store={store}>
      <Router>
      
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Videogames />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/crear" element={<CrearVideogame />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
