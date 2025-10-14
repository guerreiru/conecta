type City = {
  id: string;
  name: string;
};

export type State = {
  id: string;
  acronym: string;
  name: string;
  cities: City[] | null;
};
