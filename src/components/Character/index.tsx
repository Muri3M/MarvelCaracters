import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Name, Image } from './styles';

interface characterProps extends TouchableOpacityProps {
  character: MarvelCharacter;
}

export const Character: React.FC<characterProps> = ({ character, ...rest }) => {
  return (
    <Container {...rest}>
      <Image
        source={{
          uri:
            character.thumbnail.path +
            '/standard_medium.' +
            character.thumbnail.extension,
        }}
      />
      <Name>{character.name}</Name>
    </Container>
  );
};
