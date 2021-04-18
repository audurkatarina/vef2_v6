// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id: string;
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: number;
  mass?: number;
}

export interface ICharacterConnection {
  characters: Array<ICharacter>;
}

export interface IFilm {
  id: string;
  episodeID?: number;
  title?: string;
  openingCrawl?: string;
  characterConnection?: ICharacterConnection;
}

export interface IFilmsAnswerGQL {
  allFilms: IAllFilms;
}

export interface IAllFilms {
  films: Array<IFilm>;
}

export interface ICharactersAnswerGQL {
  allPeople?: IAllPeople;
}

export interface IAllPeople {
  people?: Array<ICharacter>;
  pageInfo: IPageInfo;
}

export interface IPageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface IPersonAnswerGQL {
  person?: ICharacter;
}

// TODO hér ættum við að útbúa interface fyrir öll gögn sem við vinnum með (t.d. IFilm, IPaging)
// og svör sem við fáum frá GraphQL endapunkti
