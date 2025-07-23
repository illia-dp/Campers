export type OpenFiltersState = {
  equipment: boolean;
  form: boolean;
  transmission: boolean;
  engine: boolean;
};

export type FilterName = keyof OpenFiltersState;
