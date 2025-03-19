import React, { useState } from 'react';
import { ScrollView, useWindowDimensions, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { GetLocation } from '../../src/screen/main'; 
import { Provider } from 'react-native-paper';
import { format, isValid, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export default function App() {
  const [location, setLocation] = useState({
    info: {
      count: 0,
      next: '',
      pages: 0,
      prev: '',
    },
    results: [
      {
        id: 0,
        name: '',
        type: '',
        dimension: '',
        created: '',
      },],
  });

  const [page, setPage] = useState(1); // Estado para manejar la página
  const { width } = useWindowDimensions();

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1)); 

  return (
    <Provider>
      <Container>
  
        {/* 🔹 Título principal */}
        <Title>Rick and Morty</Title>

        {/* 🔹 Subtítulo */}
        <Subtitle>Ubicaciones</Subtitle>
        <GetLocation onDataReceived={(data) => setLocation({ ...data })} page={page} />

        <ScrollView>
          <TableContainer>
            <Header>
              <HeaderItem>Nombre</HeaderItem>
              <HeaderItem>Tipo</HeaderItem>
              <HeaderItem>Dimensión</HeaderItem>
              <HeaderItem>Fecha de creación</HeaderItem>
            </Header>

            <TableBody>
              {location.results.map((episode, index) => {
                const createdDate = episode.created ? parseISO(episode.created) : null;
                const formattedDate = createdDate && isValid(createdDate)
                  ? format(createdDate, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })
                  : 'Fecha inválida';

                return (
                  <Row key={index}>
                    <TableItem>{episode.name}</TableItem>
                    <TableItem>{episode.type}</TableItem>
                    <TableItem>{episode.dimension }</TableItem>
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

          <PageText>Página {page} de {location.info.pages}</PageText>

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
  background-color:rgb(75, 233, 44);
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
