export class PaypalItemSpec {
  name: string;
  quantity: string;
  // tslint:disable-next-line:variable-name
  unit_amount: {
    currency_code: string,
    value: string
  };
}
