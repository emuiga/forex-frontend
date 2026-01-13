import { Conversion } from '@/types/conversion';

interface ConversionHistoryProps {
  conversions: Conversion[];
}

export default function ConversionHistory({ conversions }: ConversionHistoryProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (conversions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No conversion history available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Conversion
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rate
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Result
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {conversions.map((conversion) => (
            <tr key={conversion.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatAmount(conversion.amount)} {conversion.baseCurrency}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {conversion.baseCurrency} → {conversion.targetCurrency}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {conversion.conversionRate.toFixed(6)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatAmount(conversion.convertedAmount)} {conversion.targetCurrency}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {formatDate(conversion.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

