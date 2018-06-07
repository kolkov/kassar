export interface ICustomerAddress {
  city: string;
  street: string;
  building: string;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
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
