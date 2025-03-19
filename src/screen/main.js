import React, { useEffect } from 'react';
import { getCharacters, getEpisodes, getLocations } from '../request/api'; // Importamos la función del API

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
      console.log('🔹 Lista de personajes en página ${page}:', locationData);

      if (onDataReceived) {
        onDataReceived({ ...locationData }); // Forzamos la actualización del estado
      }
    };

    fetchData(); // Llamar a la función al cargar el componente
  }, [page]);

  return null;
};


export {TestScreen, GetEpisode, GetLocation};
