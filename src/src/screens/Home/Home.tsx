import {BottomModal, Icon, RadioButtonOptions, TouchFiller} from '@components';
import {MainLayout} from '@hoc';
import {useAppTheme} from '@theme';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, ViewStyle, useWindowDimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';

enum CURRENCY {
  USD = 'USD',
  EGP = 'EGP',
  EUR = 'EUR',
}

const Home = () => {
  const {t} = useTranslation();
  // console.log(i18n.language);

  const currencyNames: {[index in CURRENCY]: string} = useMemo(() => {
    return {
      [CURRENCY.USD]: t('currency.usd') as string,
      [CURRENCY.EUR]: t('currency.eur') as string,
      [CURRENCY.EGP]: t('currency.egp') as string,
    };
  }, [t]);
  const [fromSelection, setFromSelection] = useState<CURRENCY>(CURRENCY.USD);
  const [toSelection, setToSelection] = useState<CURRENCY>(CURRENCY.EGP);
  const [isFromModalVisible, setIsFromModalVisible] = useState(false);
  const [isToModalVisible, setIsToModalVisible] = useState(false);

  const reverse = useCallback(() => {
    const _fromSelection = fromSelection;
    const _toSelection = toSelection;
    setFromSelection(_toSelection);
    setToSelection(_fromSelection);
  }, [fromSelection, toSelection, setFromSelection, setToSelection]);

  const currencyChoices = useMemo(() => {
    return Object.keys(currencyNames).map(currency => {
      const _currency = currency as CURRENCY;
      return {label: currencyNames[_currency], value: _currency};
    });
  }, [currencyNames]);

  const fromCurrencyModal = useMemo(() => {
    return (
      <BottomModal
        isVisible={isFromModalVisible}
        setIsVisible={setIsFromModalVisible}>
        <RadioButtonOptions
          value={fromSelection}
          setValue={newValue => {
            if (newValue === toSelection) {
              reverse();
            } else {
              setFromSelection(newValue as CURRENCY);
            }
            setIsFromModalVisible(false);
          }}
          labels={currencyChoices}
        />
      </BottomModal>
    );
  }, [
    isFromModalVisible,
    setIsFromModalVisible,
    fromSelection,
    setFromSelection,
    currencyChoices,
    toSelection,
    reverse,
  ]);
  const toCurrencyModal = useMemo(() => {
    return (
      <BottomModal
        isVisible={isToModalVisible}
        setIsVisible={setIsToModalVisible}>
        <RadioButtonOptions
          value={toSelection}
          setValue={newValue => {
            if (newValue === fromSelection) {
              reverse();
            } else {
              setToSelection(newValue as CURRENCY);
            }
            setIsToModalVisible(false);
          }}
          labels={currencyChoices}
        />
      </BottomModal>
    );
  }, [
    isToModalVisible,
    toSelection,
    setToSelection,
    setIsToModalVisible,
    currencyChoices,
    fromSelection,
    reverse,
  ]);

  const colors = useAppTheme().colors;

  /*const fromChoices: Record<string, Currency>[] = useMemo((
    ()=>{return currencyNames.map(
      (name, index) => ({}))}
  ) => {}, []);
  */

  return (
    <View className="self-stretch items-stretch">
      <Chart />
      <View className="flex-row self-stretch" style={{gap: 15}}>
        <SwitchActionButton
          style={{flex: 1}}
          onPress={() => {
            setIsFromModalVisible(true);
          }}>
          <Text style={{color: colors.normalText}} className="font-bold">
            {currencyNames[fromSelection]}
          </Text>
        </SwitchActionButton>
        <SwitchActionButton style={{width: 48}} onPress={reverse}>
          <Icon size={20} color={colors.normalText} name="random" />
        </SwitchActionButton>
        <SwitchActionButton
          style={{flex: 1}}
          onPress={() => {
            setIsToModalVisible(true);
          }}>
          <Text style={{color: colors.normalText}} className="font-bold">
            {currencyNames[toSelection]}
          </Text>
        </SwitchActionButton>
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
