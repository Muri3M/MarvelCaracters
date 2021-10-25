interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: [
    {
      type: string;
      url: string;
    }
  ];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        type: string;
      }
    ];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  };
  series: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  };
}

interface MarvelAPI {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: [MarvelCharacter];
  };
  etag: string;
}

type LoadState = {
  isLoading: boolean;
  characters: MarvelCharacter[];
  offSet: number;
  error: any;
};

type LoadAction = {
  type: string;
  payload: MarvelCharacter[];
  character: MarvelCharacter;
};

type SearchState = {
  isLoading: boolean;
  characters: MarvelCharacter[];
  error: any;
};

type SearchAction = {
  type: string;
  payload: MarvelCharacter[];
  character: MarvelCharacter;
};

type SelectState = {
  character?: MarvelCharacter;
  place: string;
};

type SelectAction = {
  type: string;
  payload: MarvelCharacter;
  place: string;
};

type AllStates = {
  loadCharacters: LoadState;
  searchCharacters: SearchState;
  selectCharacter: SelectState;
};

type DispatchType = (args: LoadAction) => LoadAction;
