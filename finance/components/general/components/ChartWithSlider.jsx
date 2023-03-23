import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';

// net worth chart using recharts
export function ChartWithSlider({ data, isLoading, options }) {
  const {
    xAxisProps,
    yAxisProps,
    referenceLineProps,
    tooltipFormatter,
    legendFormatter,
    lineProps,
    sliderLineProps,
  } = options;

  const { xAxisKey } = xAxisProps;
  const { yAxisKey } = yAxisProps;

  const [chartData, setChartData] = useState(data);
  const [domain, setDomain] = useState(['dataMin', 'dataMax']);
  const [sliderDomain, setSliderDomain] = useState([0, 100]);

  const resetDomain = () => {
    setChartData(data);
    setDomain([data[0][xAxisKey], data[data.length - 1][xAxisKey]]);
    setSliderDomain([0, 100]);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      resetDomain();
    }
  }, [data]);

  return (
    <div onDoubleClick={resetDomain} className="tw-w-full tw-h-full tw-px-20">
      {isLoading && (
        <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center">
          <div className="tw-w-20 tw-h-20 tw-border-4 tw-border-blue-500 tw-rounded-full tw-animate-spin" />
        </div>
      )}
      {!isLoading && (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={500}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis type="category" dataKey={xAxisKey} domain={domain} />
              <YAxis dataKey={yAxisKey} width={100} />
              {referenceLineProps && (
                <ReferenceLine
                  x={referenceLineProps.x}
                  stroke="green"
                  label={referenceLineProps.label}
                  {...referenceLineProps}
                />
              )}
              <Tooltip formatter={tooltipFormatter} />
              <Legend formatter={legendFormatter} />
              <Line
                type="linear"
                dataKey={yAxisKey}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                {...lineProps}
              />
            </LineChart>
          </ResponsiveContainer>
          <div>
            <ResponsiveContainer width="100%" height={50}>
              <LineChart
                width={200}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <Line
                  type="linear"
                  dataKey={yAxisKey}
                  stroke="#8884d8"
                  activeDot={false}
                  dot={false}
                  {...sliderLineProps}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <AirbnbSlider
            slots={{ thumb: AirbnbThumbComponent }}
            getAriaLabel={(index) => (index === 0 ? 'Minimum' : 'Maximum')}
            defaultValue={[0, 100]}
            value={sliderDomain}
            onChange={(event, value) => {
              const [min, max] = value;
              const left = Math.floor((min / 100) * data.length);
              const right = Math.floor((max / 100) * data.length) + 1;
              const newData = data.slice(left, right);
              const domainLeft = newData[0][xAxisKey];
              const domainRight = newData[newData.length - 1][xAxisKey];

              setDomain([domainLeft, domainRight]);
              setSliderDomain(value);
              setChartData(newData);
            }}
          />
        </>
      )}
    </div>
  );
}

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));
