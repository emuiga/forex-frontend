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
  id: string;
  amount: number;
  baseCurrency: string;
  targetCurrency: string;
  conversionRate: number;
  convertedAmount: number;
  createdAt: string;
}

export interface RatesResponse {
  base: string;
  rates: Record<string, number>;
}

