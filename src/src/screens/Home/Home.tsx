import {MainLayout} from '@hoc';
import {useAppTheme} from '@theme';
import React, {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {View, useWindowDimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Home = () => {
  const {t} = useTranslation();
  // console.log(i18n.language);

  const colors = useAppTheme().colors;

  return (
    <View>
      <Chart />
    </View>
  );
};

const Chart = memo(() => {
  const {width} = useWindowDimensions();

  const theme = useAppTheme();
  const colors = theme.colors;

  const chartColor = useCallback(
    (opacity = 1) => {
      return theme.dark
        ? `rgba(0, 255, 0, ${opacity})`
        : `rgba(0, 255, 0, ${opacity})`;
    },
    [theme.dark],
  );

  const labelColor = useCallback(
    (opacity = 1) => {
      return theme.dark
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`;
    },
    [theme.dark],
  );
  return (
    <LineChart
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      }}
      width={width - 30} // from react-native
      height={220}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: 'yellow',
        backgroundGradientFrom: colors.chartBgColor,
        backgroundGradientTo: colors.chartBgColor,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: chartColor,
        labelColor: labelColor,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: colors.normalText,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
});

export default () => {
  const {t} = useTranslation();

  return MainLayout(Home, {
    title: t('screen.home'),
    hasBackButton: false,
    hzPadding: 15,
  });
};
