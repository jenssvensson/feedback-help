export class PaypalAmountSummary {
  // tslint:disable-next-line:variable-name
  currency_code: string;
  value: string;
  breakdown: {
    item_total: {
      currency_code: string,
      value: string
    }
  };
}
