import React, { useState } from 'react';
import { ScrollView, useWindowDimensions, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { GetEpisode } from '../../src/screen/main'; 
import { Provider } from 'react-native-paper';
import { format, isValid, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export default function App() {
  const [episodes, setEpisodes] = useState({
    info: {
      count: 0,
      next: '',
      pages: 0,
      prev: '',
    },
    results: [],
  });

  const [page, setPage] = useState(1); // Estado para manejar la página
  const { width } = useWindowDimensions();
  const itemSize = 380;
  const numColumns = Math.max(1, Math.floor(width / itemSize));

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1)); 

  return (
    <Provider>
      <Container>
  
        {/* 🔹 Título principal */}
        <Title>Rick and Morty</Title>

        {/* 🔹 Subtítulo */}
        <Subtitle>Episodios</Subtitle>
        <GetEpisode onDataReceived={(data) => setEpisodes({ ...data })} page={page} />
        <ScrollView>
          <TableContainer>
            <Header>
              <HeaderItem>Episodio</HeaderItem>
              <HeaderItem>Nombre</HeaderItem>
              <HeaderItem>Fecha al aire</HeaderItem>
              <HeaderItem>Fecha de creación</HeaderItem>
            </Header>

            <TableBody>
              {episodes.results.map((episode, index) => {
                const createdDate = episode.created ? parseISO(episode.created) : null;
                const formattedDate = createdDate && isValid(createdDate)
                  ? format(createdDate, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })
                  : 'Fecha inválida';

                return (
                  <Row key={index}>
                    <TableItem>{episode.episode}</TableItem>
                    <TableItem>{episode.name}</TableItem>
                    <TableItem>{episode.air_date}</TableItem>
                    <TableItem>{formattedDate}</TableItem>
                  </Row>
                );
              })}
            </TableBody>
          </TableContainer>
        </ScrollView>

        {/* Controles de navegación */}
        <PaginationContainer>
          <ArrowButton onPress={prevPage} disabled={page === 1}>
            <ArrowText>{'◀️'}</ArrowText>
          </ArrowButton>

          <PageText>Página {page} de {episodes.info.pages}</PageText>

          <ArrowButton onPress={nextPage}>
            <ArrowText>{'▶️'}</ArrowText>
          </ArrowButton>
        </PaginationContainer>
      </Container>
    </Provider>
  );
}

// 🎨 Estilos con styled-components
const TableContainer = styled.View`
  width: 100%;
  border-collapse: collapse;
`;

const Header = styled.View`
  flex-direction: row;
  background-color:rgb(52, 146, 235);
  padding: 10px;
  justify-content: space-between;
`;

const HeaderItem = styled.Text`
  font-weight: bold;
  color: #333;
  width: 25%;
  text-align: center;
`;

const TableBody = styled.View`
  background-color: white;
  padding: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  padding: 8px 0;
  justify-content: space-between;
`;

const TableItem = styled.Text`
  color: #666;
  text-align: center;
  width: 25%;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ArrowButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
`;

const ArrowText = styled.Text`
  font-size: 24px;
`;

const PageText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-horizontal: 15px;
`;

const Container = styled.View`
  width: 100%;
  flex: 1;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const Subtitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #34495e;
`;
