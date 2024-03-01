import {TouchFiller, BottomModal} from '@components';
import {MainLayout} from '@hoc';
import {useAppTheme} from '@theme';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {useSSR, useTranslation} from 'react-i18next';
import {View, ViewStyle, useWindowDimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';

const Home = () => {
  const {t} = useTranslation();
  // console.log(i18n.language);

  const currencyNames = useMemo(() => {
    return {
      USD: t('currency.usd') as string,
      EUR: t('currency.eur') as string,
      EGP: t('currency.egp') as string,
    };
  }, [t]);

  const [isFromModalVisible, setIsFromModalVisible] = useState(false);
  const [isToModalVisible, setIsToModalVisible] = useState(false);

  const fromCurrencyModal = useMemo(() => {
    return (
      <BottomModal
        isVisible={isFromModalVisible}
        setIsVisible={setIsFromModalVisible}>
        <Text>Hi</Text>
      </BottomModal>
    );
  }, [isFromModalVisible, setIsFromModalVisible]);
  const toCurrencyModal = useMemo(() => {
    return (
      <BottomModal
        isVisible={isToModalVisible}
        setIsVisible={setIsToModalVisible}>
        <Text>Hi</Text>
      </BottomModal>
    );
  }, [isToModalVisible, setIsToModalVisible]);

  const colors = useAppTheme().colors;

  return (
    <View className="self-stretch items-stretch">
      <Chart />
      <View className="flex-row self-stretch" style={{gap: 15}}>
        <SwitchActionButton
          style={{flex: 1}}
          onPress={() => {
            setIsFromModalVisible(true);
          }}>
          <Text style={{color: colors.normalText}}>USD</Text>
        </SwitchActionButton>
        <SwitchActionButton
          style={{flex: 1}}
          onPress={() => {
            setIsToModalVisible(true);
          }}>
          <Text style={{color: colors.normalText}}>USD</Text>
        </SwitchActionButton>
      </View>

      <View className="flex-row self-stretch flex-wrap" style={{gap: 15}}>
        <Text>{currencyNames.USD}</Text>
        <Text>{currencyNames.EGP}</Text>
        <Text>{currencyNames.EUR}</Text>
      </View>

      {fromCurrencyModal}
      {toCurrencyModal}
    </View>
  );
};

const SwitchActionButton = memo(
  ({
    children,
    style,
    onPress,
  }: {
    children: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
  }) => {
    const colors = useAppTheme().colors;
    return (
      <View
        className="overflow-hidden rounded-[15px] h-12 items-center justify-center border-[2px]"
        style={[style, {borderColor: colors.normalText}]}>
        <TouchFiller onPress={onPress} />
        {children}
      </View>
    );
  },
);

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
