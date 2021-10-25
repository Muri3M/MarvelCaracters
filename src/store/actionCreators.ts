import * as actionTypes from './actionTypes';
import axios from 'axios';
import md5 from 'md5';

export const loadCharacters = (offSet: number) => {
  const date = Date.now();

  const privateKey = '1e4901a22e308155938c0a488ace36e43d513a17';
  const publicKey = 'c9422ddcd44c004ea26ce01658edbe94';

  return (dispatch: any) => {
    dispatch({ type: actionTypes.LOAD_CHARACTERS_IN_PROGRESS });
    axios
      .get<MarvelAPI>('https://gateway.marvel.com//v1/public/characters', {
        params: {
          apikey: publicKey,
          ts: date,
          hash: md5(date + privateKey + publicKey),
          limit: 10,
          offset: offSet,
        },
      })
      .then(function (Response) {
        dispatch({
          type: actionTypes.LOAD_CHARACTERS_SUCCESS,
          payload: Response.data.data.results,
        });
      })
      .catch(function (error) {
        dispatch({ type: actionTypes.LOAD_CHARACTERS_FAILURE, payload: error });
      });
  };
};

export const searchCharacters = (offSet: number, search: string) => {
  const date = Date.now();

  const privateKey = '1e4901a22e308155938c0a488ace36e43d513a17';
  const publicKey = 'c9422ddcd44c004ea26ce01658edbe94';

  return (dispatch: any) => {
    dispatch({ type: actionTypes.SEARCH_CHARACTERS_IN_PROGRESS });
    axios
      .get<MarvelAPI>('https://gateway.marvel.com//v1/public/characters', {
        params: {
          apikey: publicKey,
          ts: date,
          hash: md5(date + privateKey + publicKey),
          limit: 10,
          offset: offSet,
          nameStartsWith: search,
        },
      })
      .then(function (Response) {
        if (offSet > 0) {
          dispatch({
            type: actionTypes.SCROLL_SEARCH_CHARACTERS_SUCCESS,
            payload: Response.data.data.results,
          });
        } else {
          dispatch({
            type: actionTypes.SEARCH_CHARACTERS_SUCCESS,
            payload: Response.data.data.results,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: actionTypes.SEARCH_CHARACTERS_FAILURE,
          payload: error,
        });
      });
  };
};

export const selectCharacter = (
  character: MarvelCharacter | undefined,
  place: string
) => {
  return (dispatch: any) => {
    console.log(character);
    dispatch({
      type: actionTypes.SELECT_CHARACTER,
      payload: character,
      place: place,
    });
  };
};

export const updateCharacter = (
  character: MarvelCharacter | undefined,
  place: string
) => {
  return (dispatch: any) => {
    console.log(character);
    if (place === 'Load') {
      dispatch({
        type: actionTypes.EDIT_LOAD_CHARACTERS,
        character: character,
      });
    } else {
      dispatch({
        type: actionTypes.EDIT_SEARCH_CHARACTERS,
        character: character,
      });
    }
  };
};
