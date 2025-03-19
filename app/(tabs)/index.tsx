import React, { useState } from 'react';
import { ScrollView, FlatList, useWindowDimensions, TouchableOpacity, Modal, View, Text } from 'react-native';
import styled from 'styled-components/native';
import {TestScreen, GetCharacterFilter} from '../../src/screen/main'; 
import CharacterDetail from '../modal/characterDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider ,Tooltip } from 'react-native-paper';

export default function App() {
  const [characters, setCharacters] = useState({
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
        status: '',
        species: '',
        gender: '',
        image: '',
      },
    ],
  });

  //console.log(characters.results);

  const [page, setPage] = useState(1); // Estado para manejar la página

  const { width } = useWindowDimensions();  // Obtiene el ancho de la pantalla
  const itemSize = 380;  // 🔹 Tamaño fijo para cada cuadrado
  const numColumns = Math.max(1, Math.floor(width / itemSize)); //Calcula cuántas columnas caben

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedCharacter, setSelectedCharacter] = useState(null); //  Estado para el personaje seleccionado
  const [modalVisible, setModalVisible] = useState(false); //  Estado para mostrar la modal

  const openModal = (character) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Funciones para cambiar de página
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1)); 

  return (
    <Provider>
      <Container>
  
        {/* 🔹 Título principal */}
        <Title>Rick and Morty</Title>
  
        {/* 🔹 Subtítulo */}
        <Subtitle>Personajes</Subtitle>
        
          {/* 🔹 Barra de búsqueda */}
          <SearchBar
            placeholder="Buscar personaje..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        <GetCharacterFilter onDataReceived={(data) => setCharacters({ ...data })} name={searchQuery} />
        <TestScreen onDataReceived={(data) => setCharacters({ ...data })} page={page} />
  
        <ScrollView>
          <FlatList
            key={numColumns}
            data={characters.results}
            numColumns={numColumns} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card numColumns={numColumns}>
                <EyeButton>
                  <Tooltip title="Vista de detalle" enterTouchDelay={200} leaveTouchDelay={100}>
                    <TouchableOpacity onPress={() => openModal(item)}>
                      <Icon name="eye" size={20} color="#555" />
                    </TouchableOpacity>
                  </Tooltip>
                </EyeButton>
                <CharacterImage source={{ uri: item.image }} />
                <CharacterInfo>
                  <CharacterName>{item.name}</CharacterName>
                  <CharacterText>Status: {item.status}</CharacterText>
                  <CharacterText>Species: {item.species}</CharacterText>
                  <CharacterText>Gender: {item.gender}</CharacterText>
                </CharacterInfo>
              </Card>
            )}
          />
        </ScrollView>
  
        {/* 🔹 Controles de navegación */}
        <PaginationContainer>
          <ArrowButton onPress={prevPage} disabled={page === 1}>
            <ArrowText>{'◀️'}</ArrowText>
          </ArrowButton>
          <PageText>Página {page} de {characters.info.pages}</PageText>
          <ArrowButton onPress={nextPage}>
            <ArrowText>{'▶️'}</ArrowText>
          </ArrowButton>
        </PaginationContainer>
  
        {/* 🔹 Modal para mostrar detalles */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <CharacterDetail character={selectedCharacter} onClose={closeModal} />
        </Modal>
  
      </Container>
    </Provider>
  );
}

// 🎨 Estilos con styled-components
const Container = styled.View`
  flex: 1;
  background-color: #f4f4f4;
  padding: 20px;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  margin-horizontal: 5px;
  width: ${({ numColumns }) => `calc(${100 / numColumns}% - 10px)`};
  flex-direction: row;
  align-items: center;
  shadow-color: black;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 5;
`;

const CharacterImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

const CharacterInfo = styled.View`
  margin-left: 15px;
`;

const CharacterName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const CharacterText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 2px;
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

const EyeButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
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

const SearchBar = styled.TextInput`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  shadow-color: black;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 5;
  margin-bottom: 15px;
`;
