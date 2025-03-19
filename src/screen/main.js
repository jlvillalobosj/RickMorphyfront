import React, { useEffect } from 'react';
import { getCharacters, getEpisodes, getLocations, fetchCharacters } from '../request/api'; // Importamos la función del API

const TestScreen = ({ onDataReceived, page }) => {
  useEffect(() => {
    const fetchData = async () => {
      const charactersData = await getCharacters(page);
      console.log('🔹 Lista de personajes en página ${page}:', charactersData);

      if (onDataReceived) {
        onDataReceived({ ...charactersData }); // Forzamos la actualización del estado
      }
    };

    fetchData(); // Llamar a la función al cargar el componente
  }, [page]);

  return null;
};

const GetEpisode = ({ onDataReceived, page }) => {
  useEffect(() => {
    const fetchData = async () => {
      const episodesData = await getEpisodes(page);
      console.log('🔹 Lista de pesodasd en página ${page}:', episodesData);

      if (onDataReceived) {
        onDataReceived({ ...episodesData }); // Forzamos la actualización del estado
      }
    };

    fetchData(); // Llamar a la función al cargar el componente
  }, [page]);

  return null;
};

const GetLocation = ({ onDataReceived, page }) => {
  useEffect(() => {
    const fetchData = async () => {
      const locationData = await getLocations(page);
      console.log('🔹 Lista de ubicaciones en página ${page}:', locationData);

      if (onDataReceived) {
        onDataReceived({ ...locationData }); // Forzamos la actualización del estado
      }
    };

    fetchData(); // Llamar a la función al cargar el componente
  }, [page]);

  return null;
};

const GetCharacterFilter = ({ onDataReceived, name }) => {
  useEffect(() => {
    const fetchData = async () => {
      if (!name || name.trim() === '') return; // No hacer la solicitud si name está vacío

      const characterFilterData = await fetchCharacters(name);
      console.log(`🔹 Lista de personajes con el nombre "${name}":`, characterFilterData);

      if (onDataReceived) {
        onDataReceived({ ...characterFilterData }); // Forzamos la actualización del estado
      }
    };

    fetchData(); // Llamar a la función al cargar el componente o cuando cambie name
  }, [name]);

  return null;
};


export {TestScreen, GetEpisode, GetLocation, GetCharacterFilter};
