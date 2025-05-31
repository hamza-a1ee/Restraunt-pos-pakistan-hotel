import { IMetaData } from "../meta.interface";

export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  address: string;
}

export interface IAllCustomers {
  customers: ICustomer[];
  meta: IMetaData;
}
