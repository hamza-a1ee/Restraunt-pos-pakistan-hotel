import { IMetaData } from "../meta.interface";

export interface IGetAllTables {
  tables: ITable;
  meta: IMetaData;
}

export interface ITable {
  id: number;
  name: string;
}
