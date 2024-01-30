import {
    GET_ALL_GAMES,
    SEARCH_BY_NAME,
    GET_VIDEOGAME_DETAIL,
    GET_GENRES,
    ORDER_BY,
    FILTER_BY
  } from "./Actions/constantes";
  
  const initialState = {
    allGames: [],
    gamesBackUp: [],
    gameDetails: {},
    genres: [],
    filtered: []
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_GAMES:
        return {
          ...state,
          allGames: action.payload,
          gamesBackUp: action.payload,
          filtered: action.payload
        };
      case GET_VIDEOGAME_DETAIL:
        return {
          ...state,
          gameDetails: action.payload
        };
  
      case SEARCH_BY_NAME:
        return {
          ...state,
          gamesBackUp: action.payload,
          filtered: action.payload
        };
  
      case GET_GENRES:
        return {
          ...state,
          genres: action.payload
        };
  
      case FILTER_BY:
        if (action.payload === 'default') {
          return { ...state, filtered: state.gamesBackUp };
        } else if (action.payload === 'DB') {
          const filteredGames = state.gamesBackUp.filter((game) => typeof game.id === 'string');
          return { ...state, filtered: filteredGames };
        } else if (action.payload === 'API') {
          const filteredGames = state.gamesBackUp.filter((game) => typeof game.id === 'number');
          return { ...state, filtered: filteredGames };
        } else {
          const filteredGamesByGenre = state.gamesBackUp.filter((game) =>
            game.genres.some((genre) => genre.name.toLowerCase() === action.payload.toLowerCase())
          );
          return { ...state, filtered: [...filteredGamesByGenre] };
        }
  
      case ORDER_BY:
        if (action.payload === 'A-Z') {
          return { ...state, filtered: [...state.filtered].sort((prev, next) => {
            if (prev.name > next.name) return 1
            if (prev.name < next.name) return -1
            return 0
          })}
        } else if (action.payload === 'Z-A') {
          return { ...state, filtered: [...state.filtered].sort((prev, next) => {
            if (prev.name > next.name) return -1
            if (prev.name < next.name) return 1
            return 0
          })}
        } else if (action.payload === 'desc') {
          return { ...state, filtered: [...state.filtered].sort((prev, next) => prev.rating - next.rating) }
        } else if (action.payload === 'asc') {
          return { ...state, filtered: [...state.filtered].sort((prev, next) => next.rating - prev.rating) }
        } else {
          return { ...state, filtered: state.gamesBackUp }
        };
  
      default:
        return state;
    }
  };
  