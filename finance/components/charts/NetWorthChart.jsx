import React from 'react';

import { format } from 'mathjs';
import { useApiCall } from '../../utils/client_utils';
import { ChartWithSlider } from '../general/components';
// net worth chart using recharts
export function NetWorthChart() {
  const { data, loading } = useApiCall(loader);

  return (
    <div className="tw-w-full tw-h-1/2">
      <h2>My Net Worth</h2>
      <ChartWithSlider
        data={data}
        isLoading={loading}
        options={{
          xAxisProps: {
            xAxisKey: 'date',
          },
          yAxisProps: {
            yAxisKey: 'netWorth',
          },
          referenceLineProps: {
            x: new Date().toDateString(),
            label: 'Today',
          },
          tooltipFormatter: (value) => [value, 'Net Worth'],
          legendFormatter: () => 'Net Worth',
        }}
      />
    </div>
  );
}

const loader = {
  request: {
    url: '/api/stats/netWorth',
    method: 'GET',
  },
  responseHandler: (data) => {
    if (data.status !== 'success') {
      return [];
    }
    const trendData = data.data.trend.map((datapoint) => ({
      date: new Date(datapoint.date).toDateString(),
      netWorth: format(datapoint.netWorth, { notation: 'fixed', precision: 2 }),
    }));

    return trendData;
  },
};
