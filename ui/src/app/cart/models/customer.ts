export interface ICustomerAddress {
  full?: string;
  city?: string;
  city_fias_id?: string;
  street?: string;
  street_fias_id?: string;
  street_type?: string;
  street_type_full?: string;
  house?: string;
  house_fias_id?: string;
  house_type?: string;
  house_type_full?: string;
  postal_code?: string;
  block?: string;
  block_type?: string;
  entrance?: string
  floor?: string;
  code?: string;
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
