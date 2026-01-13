import { useState, useEffect } from 'react';
import { convertCurrency, fetchRates } from '@/lib/api';
import { ConvertResponse } from '@/types/conversion';

interface ConversionFormProps {
  onConvert: (result: ConvertResponse) => void;
}

export default function ConversionForm({ onConvert }: ConversionFormProps) {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const ratesData = await fetchRates('USD');
        const currencyList = [ratesData.base, ...Object.keys(ratesData.rates)].sort();
        setCurrencies(currencyList);
      } catch (err) {
        setError('Failed to load currencies');
      }
    };
    loadCurrencies();
  }, []);

  const validate = (): boolean => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }
    if (!baseCurrency || !targetCurrency) {
      setError('Please select both currencies');
      return false;
    }
    if (baseCurrency === targetCurrency) {
      setError('Base and target currencies must be different');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await convertCurrency({
        amount: parseFloat(amount),
        baseCurrency,
        targetCurrency,
      });
      onConvert(result);
      setAmount('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="baseCurrency" className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="targetCurrency" className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Converting...' : 'Convert'}
      </button>
    </form>
  );
}

