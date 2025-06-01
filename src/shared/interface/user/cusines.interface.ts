import { IMetaData } from "../meta.interface";

export interface ICusine {
  id: string;
  price: number;
  name: string;
  categoryId: string;
}

export interface IAllCuisine {
  dishes: ICusine[];
  meta: IMetaData;
}
export interface ICusineCategory {
  id: string;
  name: string;
}

export interface ICuisineCategoryTable extends ICusineCategory {
  totalDishes: number;
}

export interface IAllCuisineCategoryTable {
  categories: ICuisineCategoryTable[];
  meta: IMetaData;
}
