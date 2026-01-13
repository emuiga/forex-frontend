import { useState, useEffect } from 'react';
import { fetchConversions } from '@/lib/api';
import { Conversion, ConvertResponse } from '@/types/conversion';
import ConversionForm from '@/components/ConversionForm';
import ConversionHistory from '@/components/ConversionHistory';

export default function Home() {
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadConversions = async () => {
    try {
      setError('');
      const data = await fetchConversions();
      setConversions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversion history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversions();
  }, []);

  const handleConvert = (result: ConvertResponse) => {
    loadConversions();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forex Rate Converter</h1>
          <p className="text-gray-600">Convert between different currencies</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">New Conversion</h2>
          <ConversionForm onConvert={handleConvert} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Conversion History</h2>
          
          {loading && (
            <div className="text-center text-gray-500 py-8">
              Loading...
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">
              {error}
            </div>
          )}

          {!loading && !error && <ConversionHistory conversions={conversions} />}
        </div>
      </div>
    </div>
  );
}
