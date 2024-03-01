import {Text} from '@components';
import {MainLayout} from '@hoc';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Image} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {useWindowDimensions} from 'react-native';
import {useAppTheme} from '@theme';

import axios from 'axios';
import {Button} from 'react-native-paper';

type UserdataType = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

const Home = () => {
  const {t} = useTranslation();
  // console.log(i18n.language);

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
    <View>
      <Text>Bezier Line Chart</Text>
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
          labelColor: labelColor, //`rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default () => {
  const {t} = useTranslation();

  return MainLayout(Home, {
    title: t('screen.home'),
    hasBackButton: false,
    hzPadding: 15,
  });
};
