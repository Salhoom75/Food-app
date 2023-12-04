export interface iCategory {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface iCategoryTable {
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  data: iCategory[];
}
