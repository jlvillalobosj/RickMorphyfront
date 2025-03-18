import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function CharacterDetail({ character, onClose }) {
  if (!character) return null; // 🔹 No renderizar si no hay personaje

  // Convertimos la fecha a un formato más amigable
  const formattedDate = format(new Date(character.created), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });

  const getStatusIcon = (status) => {
    if (status === 'Alive') return <Icon name="circle" size={16} color="green" />;
    if (status === 'Dead') return <Icon name="heartbeat" size={16} color="red" />;
    return <Icon name="question-circle" size={16} color="gray" />;
  };

  const getGenderIcon = (gender) => {
    if (gender === 'Male') return <Icon name="mars" size={16} color="blue" />;
    if (gender === 'Female') return <Icon name="venus" size={16} color="pink" />;
    return <Icon name="question-circle" size={16} color="gray" />;
  };

  const getSpeciesIcon = (species) => {
    const icons = {
      Human: "user",
      Alien: "rocket",
      Poopybutthole: "smile",
      "Mythological Creature": "empire",
      Disease: "bug"
    };
    return <Icon name={icons[species] || "question-circle"} size={16} color="purple" />;
  };

  return (
    <Modal transparent animationType="fade" visible={!!character}>
      <ModalContainer>
        <Content>
          <CloseButton onPress={onClose}>
            <CloseText>X</CloseText>
          </CloseButton>

          {/* Título encima de la imagen y texto, alineado al centro */}
          <Title>{character.name}</Title>

          <InfoContainer>
            <CharacterImage source={{ uri: character.image }} />

            <TextContainer>
              <StatusRow>
                {getStatusIcon(character.status)}
                <CharacterText>{character.status}</CharacterText>
              </StatusRow>

              <StatusRow>
                {getSpeciesIcon(character.species)}
                <CharacterText>{character.species}</CharacterText>
              </StatusRow>

              <StatusRow>
                {getGenderIcon(character.gender)}
                <CharacterText>{character.gender}</CharacterText>
              </StatusRow>

              <StatusRow>
                <Icon name="map-marker" size={16} color="gray" />
                <CharacterText>{character.location.name}</CharacterText>
              </StatusRow>

              <StatusRow>
                <Icon name="home" size={16} color="gray" />
                <CharacterText>{character.origin.name}</CharacterText>
              </StatusRow>

              <StatusRow>
                <Icon name="calendar" size={16} color="gray" />
                <CharacterText>{formattedDate}</CharacterText>
              </StatusRow>
            </TextContainer>
          </InfoContainer>
        </Content>
      </ModalContainer>
    </Modal>
  );
}

// 🎨 **Estilos con styled-components**

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px; /* 🔹 Evita que el modal se expanda demasiado */
`;

const Content = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px; /* 🔹 Evita que sea demasiado grande */
  flex-direction: column; /* 🔹 Coloca el título encima */
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
`;

const CloseText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: red;
`;

const Title = styled.Text`
  font-size: 28px; /* 🔹 Aumentamos el tamaño del título */
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const InfoContainer = styled.View`
  flex-direction: row; /* 🔹 Coloca la imagen a la izquierda y el texto a la derecha */
  align-items: center;
  width: 100%;
`;

const CharacterImage = styled.Image`
  width: 120px; /* 🔹 Se redujo el tamaño */
  height: 120px;
  border-radius: 10px;
  margin-right: 15px; /* 🔹 Espacio a la derecha de la imagen */
`;

const TextContainer = styled.View`
  flex: 1;
  flex-shrink: 1; /* 🔹 Evita que crezca demasiado */
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px; /* 🔹 Se redujo el espacio */
`;

const CharacterText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-left: 8px;
`;

