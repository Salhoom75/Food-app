export interface IRecipeTable {
  pageSize: number;
  pageNumber: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  data: IRecipe[];
}

export interface IRecipe {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: ICategory[];
  tag: Itag;
}

export interface Itag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface ICategory {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
