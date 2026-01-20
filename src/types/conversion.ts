export interface ConvertRequest {
  amount: number;
  baseCurrency: string;
  targetCurrency: string;
}

export interface ConvertResponse {
  amount: number;
  baseCurrency: string;
  targetCurrency: string;
  conversionRate: number;
  convertedAmount: number;
}

export interface Conversion {
  amount: number;
  baseCurrency: string;
  targetCurrency: string;
  conversionRate: number;
  convertedAmount: number;
  createdAt: Date;
}

export interface RatesResponse {
  base: string;
  rates: Record<string, number>;
}

