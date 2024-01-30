import axios from "axios";
import {
  GET_ALL_GAMES,
  SEARCH_BY_NAME,
  GET_VIDEOGAME_DETAIL,
  GET_GENRES,
  ORDER_BY,
  FILTER_BY,
} from "./constantes";

//* Trae todos los juegos (DB + API) con paginación
export function getAllGames() {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogames?api_key=f37460907a6e4c21ab184f796c6bb3b7`)
      .then((res) => {
        dispatch({ type: GET_ALL_GAMES, payload: res.data });
      })
      .catch((err) => {
        console.error("Error en getAllGames:", err);
      });
  };
}

//* Trae todos los juegos encontrados por nombre (QUERY: "name")
export function searchByName(name) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogames?name=${name}`)
      .then((res) => {
        dispatch({ type: SEARCH_BY_NAME, payload: res.data });
      })
      .catch((err) => {
        console.error("Error en searchByName:", err);
        // Puedes agregar una acción adicional para manejar el error si es necesario
        // dispatch({ type: ERROR_SEARCH_BY_NAME, payload: err });
      });
  };
}


//* Trae los detalles del juego por pasado por (params :ID)
export function getVideogameDetail(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((res) => {
        console.log("Respuesta en getVideogameDetailsss:", res);
        dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data });
      })
      .catch((err) => {
        console.error("Error en getVideogameDetail:", err);
      });
  };
}

// export function getVideogameDetail(id) {
//   return function (dispatch) {
//     return axios
//       .get(`http://localhost:3001/videogames/${id}`)
//       .then((res) => {
//         console.log(res);
//         dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data });
//       })
//       .catch((err) => {
//         console.error("Error en getVideogameDetail:", err);
//       });
//   };
// }

//* Trae todos los generos
export function getGenres() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/genres`)
      .then((res) => {
        dispatch({ type: GET_GENRES, payload: res.data });
      })
      .catch((err) => {
        console.error("Error en getGenres:", err);
      
      });
  };
}

//* Ordenamiento
export function orderBy(order) {
  return function (dispatch) {
    dispatch({ type: ORDER_BY, payload: order });
  };
}

//* Filtrado
export function filterBy(order) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY, payload: order });
  };
}
