export interface Countries {
  cca3: string;
  name: { common: string };
  flags: {png: string};
}

export interface Country {
  capital: string[];
  continents: string[];
  population: number;
  languages: { [key: string]: string };
  name: { common: string };
  borders: string[];
  flags: { png: string };
}