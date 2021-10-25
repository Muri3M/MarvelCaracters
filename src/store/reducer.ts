/* eslint-disable no-case-declarations */
import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  characters: [],
  offSet: 0,
  error: null,
};

export const loadCharacters = (
  state: LoadState = initialState,
  action: LoadAction
): LoadState => {
  const { type, payload, character } = action;
  switch (type) {
    case actionTypes.LOAD_CHARACTERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        characters: state.characters.concat(payload),
        offSet: state.offSet + 10,
      };
    }
    case actionTypes.LOAD_CHARACTERS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_CHARACTERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case actionTypes.EDIT_LOAD_CHARACTERS:
      function compare(a: MarvelCharacter, b: MarvelCharacter) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      if (character !== undefined && character !== null) {
        const updatedCharacters: MarvelCharacter[] = state.characters.filter(
          (char) => char.id !== character.id
        );
        return {
          ...state,
          characters: updatedCharacters.concat(character).sort(compare),
        };
      }
    default:
      return state;
  }
};

export const searchCharacters = (
  state: SearchState = initialState,
  action: SearchAction
): SearchState => {
  const { type, payload, character } = action;
  switch (type) {
    case actionTypes.SEARCH_CHARACTERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        characters: payload,
      };
    }
    case actionTypes.SCROLL_SEARCH_CHARACTERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        characters: state.characters.concat(payload),
      };
    }
    case actionTypes.SEARCH_CHARACTERS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SEARCH_CHARACTERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case actionTypes.EDIT_SEARCH_CHARACTERS:
      if (character !== undefined && character !== null) {
        function compare(a: MarvelCharacter, b: MarvelCharacter) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        const updatedCharacters: MarvelCharacter[] = state.characters.filter(
          (character) => character.id !== action.character.id
        );
        return {
          ...state,
          characters: updatedCharacters.concat(character).sort(compare),
        };
      }
    default:
      return state;
  }
};

export const selectCharacter = (
  state: SelectState = { character: undefined, place: 'Load' },
  action: SelectAction
): SelectState => {
  const { type, payload, place } = action;
  switch (type) {
    case actionTypes.SELECT_CHARACTER: {
      return {
        ...state,
        character: payload,
        place: place,
      };
    }
    default:
      return state;
  }
};
