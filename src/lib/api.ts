import { ConvertRequest, ConvertResponse, Conversion, RatesResponse } from '@/types/conversion';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function convertCurrency(request: ConvertRequest): Promise<ConvertResponse> {
  const response = await fetch(`${API_BASE_URL}/convert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  return handleResponse<ConvertResponse>(response);
}

export async function fetchConversions(): Promise<Conversion[]> {
  const response = await fetch(`${API_BASE_URL}/conversions`);
  return handleResponse<Conversion[]>(response);
}

export async function fetchRates(base: string): Promise<RatesResponse> {
  const response = await fetch(`${API_BASE_URL}/rates?base=${encodeURIComponent(base)}`);
  return handleResponse<RatesResponse>(response);
}

