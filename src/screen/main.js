import React, { useEffect } from 'react';
import { getCharacters } from '../request/api'; // Importamos la función del API

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

export default TestScreen;
