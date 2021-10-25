import React, { Dispatch, useCallback, useEffect, useState } from 'react';

import {
  loadCharacters,
  searchCharacters,
  selectCharacter,
} from '../../store/actionCreators';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Character } from '../../components/Character';

import { FlatList } from 'react-native';
import { Container, SearchBar } from './styles';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [place, setPlace] = useState('Load');

  const [searchOffSet, setSearchOffSet] = useState(0);
  const [character, setCharacter] = useState<MarvelCharacter>();

  const dispatch: Dispatch<any> = useDispatch();
  const navigation = useNavigation();

  const offSet: number = useSelector(
    (state: AllStates) => state.loadCharacters.offSet,
    shallowEqual
  );

  const load = useCallback(
    () => dispatch(loadCharacters(offSet)),
    [dispatch, offSet]
  );

  const searchCharacter = useCallback(
    () => dispatch(searchCharacters(searchOffSet, search)),
    [dispatch, searchOffSet, search]
  );

  const setSelectCharacter = useCallback(
    () => dispatch(selectCharacter(character, place)),
    [dispatch, character, place]
  );

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setPlace('Search');
    } else {
      setPlace('Load');
    }
  }, [search]);

  function handleLoadMore() {
    load();
  }

  const characters: readonly MarvelCharacter[] = useSelector(
    (state: AllStates) => state.loadCharacters.characters,
    shallowEqual
  );

  useEffect(() => {
    setSearchOffSet(searchOffSet + 10);
    searchCharacter();
  }, [search]);

  function handleSearchLoadMore() {
    setSearchOffSet(searchOffSet + 10);
    searchCharacter();
  }

  const searchedCharacters: readonly MarvelCharacter[] = useSelector(
    (state: AllStates) => state.searchCharacters.characters,
    shallowEqual
  );

  async function handleChangeSearch(search: string) {
    setSearchOffSet(0);
    await setSearch(search);
    setSearchOffSet(10);
  }

  useEffect(() => {
    setSelectCharacter();
  }, [character]);

  async function handlePress(character: MarvelCharacter) {
    setCharacter(character);
    navigation.navigate('Info');
  }

  return (
    <Container>
      <SearchBar
        placeholder="Buscar por personagem"
        value={search}
        onChangeText={handleChangeSearch.bind(this)}
      />
      {search.length > 0 ? (
        <FlatList
          data={searchedCharacters}
          renderItem={({ item }) => (
            <Character
              key={item.id}
              character={item}
              onPress={() => handlePress(item)}
            >
              {item.name}
            </Character>
          )}
          onEndReached={handleSearchLoadMore}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.2}
          initialNumToRender={10}
        />
      ) : (
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <Character
              key={item.id}
              character={item}
              onPress={() => handlePress(item)}
            >
              {item.name}
            </Character>
          )}
          onEndReached={handleLoadMore}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.2}
          initialNumToRender={10}
        />
      )}
    </Container>
  );
};

export default Home;
