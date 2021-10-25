import React, {
  Dispatch,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { updateCharacter } from '../../store/actionCreators';

import {
  Container,
  Description,
  Image,
  Name,
  OtherInfo,
  EditButton,
  DescriptionBox,
  NameBox,
  Flex,
  ButtonText,
  NameBar,
  DescriptionBar,
  EditDescriptionButton,
  CancelButton,
  Errored,
} from './styles';

interface Values {
  Name: string;
  Description: string;
}

const Info: React.FC = () => {
  const [editingName, toggleName] = useReducer((checked) => !checked, false);
  const [editingDescription, toggleDescription] = useReducer(
    (checked) => !checked,
    false
  );
  const [characterEdit, setCharacterEdit] = useState<MarvelCharacter>();
  const dispatch: Dispatch<any> = useDispatch();

  const character: MarvelCharacter | undefined = useSelector(
    (state: AllStates) => state.selectCharacter.character,
    shallowEqual
  );

  const place: string = useSelector(
    (state: AllStates) => state.selectCharacter.place,
    shallowEqual
  );

  const edit = useCallback(
    () => dispatch(updateCharacter(characterEdit, place)),
    [dispatch, characterEdit]
  );

  useEffect(() => {
    if (character !== undefined && character !== null) {
      edit();
    }
  }, [characterEdit]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: '',
      Description: '',
    },
  });

  const onChange = (arg: any) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const onSubmitName = (data: Values) => {
    if (character !== undefined) {
      let newCharacter = character;
      newCharacter.name = data.Name;
      setCharacterEdit(newCharacter);
    }
    toggleName();
  };

  const onSubmitDescription = (data: Values) => {
    if (character !== undefined) {
      let newCharacter = character;
      newCharacter.description = data.Description;
      setCharacterEdit(newCharacter);
    }
    toggleDescription();
  };

  return (
    <>
      {character === undefined ? (
        <Container>
          <Description>No information available</Description>
        </Container>
      ) : (
        <Container>
          <Image
            source={{
              uri:
                character.thumbnail.path +
                '/landscape_incredible.' +
                character.thumbnail.extension,
            }}
          />

          {editingName ? (
            <NameBox>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <NameBar
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="Name"
                rules={{ required: true }}
              />
              <Flex />
              <EditButton onPress={() => toggleName()}>
                <ButtonText> Cancelar </ButtonText>
              </EditButton>
              <EditButton onPress={handleSubmit(onSubmitName)}>
                <ButtonText> Salvar </ButtonText>
              </EditButton>
            </NameBox>
          ) : (
            <NameBox>
              <Name>{character.name}</Name>
              <Flex />
              <EditButton onPress={() => toggleName()}>
                <ButtonText> Editar </ButtonText>
              </EditButton>
            </NameBox>
          )}
          {errors.Name !== undefined && (
            <Errored>O campo não pode ficar vazio</Errored>
          )}
          {editingDescription ? (
            <DescriptionBox>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DescriptionBar
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="Description"
                rules={{ required: true }}
              />
              <CancelButton onPress={() => toggleDescription()}>
                <ButtonText> Cancelar </ButtonText>
              </CancelButton>
              <EditDescriptionButton
                onPress={handleSubmit(onSubmitDescription)}
              >
                <ButtonText> Salvar </ButtonText>
              </EditDescriptionButton>
            </DescriptionBox>
          ) : (
            <DescriptionBox>
              {character.description.length <= 1 ? (
                <Description>No description available</Description>
              ) : (
                <Description>{character.description}</Description>
              )}
              <EditDescriptionButton onPress={() => toggleDescription()}>
                <ButtonText> Editar </ButtonText>
              </EditDescriptionButton>
            </DescriptionBox>
          )}
          {errors.Description !== undefined && (
            <Errored>O campo não pode ficar vazio</Errored>
          )}
          <OtherInfo>
            Number of comics available : {character.comics.available}
          </OtherInfo>
          <OtherInfo>
            Number of stories available : {character.stories.available}
          </OtherInfo>
          <OtherInfo>
            Number of events available : {character.events.available}
          </OtherInfo>
        </Container>
      )}
    </>
  );
};

export default Info;
