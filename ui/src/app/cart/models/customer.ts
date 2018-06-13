import {DaDataAddress} from "../../../../projects/kolkov/ngx-dadata/src/lib/models/data";

export interface ICustomerAddress {
  full?: string;
  city?: string;
  cityFiasId?: string;
  street?: string;
  streetFiasId?: string;
  streetType?: string;
  streetTypeFull?: string;
  house?: string;
  houseFiasId?: string;
  houseType?: string;
  houseTypeFull?: string;
  block?: string;
  blockType?: string;
  room?: string;
  entrance?: string
  floor?: string;
  code?: string;
  postalCode?: string;
}

export interface ICustomer {
  fio: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  gender: string;
  phone: string;
  email: string;
  address: ICustomerAddress;
  fiasAddress: DaDataAddress;
}

/*export class CustomerAddress implements ICustomerAddress {
  constructor(public city: string) {
  }
}

export class Customer implements ICustomer{

  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string,
    public address: CustomerAddress = new CustomerAddress("")
  ) {
  }

}*/
