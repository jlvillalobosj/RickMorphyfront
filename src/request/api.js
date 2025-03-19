import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/character?page=${page}`);
    return response.data; // Devuelve los personajes y la info de paginación
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    return { info: {}, results: [] }; // Devuelve estructura vacía en caso de error
  }
};

export const getLocations = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/location?page=${page}`);
    return response.data; // Devuelve la lista de ubicaciones
  } catch (error) {
    console.error('Error al obtener las ubicaciones:', error);
    return [];
  }
};

export const getEpisodes = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/episode?page=${page}`);
    console.log(response);
    return response.data; // Devuelve la lista de episodio
  } catch (error) {
    console.error('Error al obtener los episodios:', error);
    return [];
  }
};

export const fetchCharacters = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/character/?name=${name}`);
    return response.data; // Devuelve los personajes filtrados por nombre
  } catch (error) {
    console.error("Error fetching filtered characters:", error);
    return { info: {}, results: [] }; // Devuelve estructura vacía en caso de error
  }
};

