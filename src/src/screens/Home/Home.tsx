import {
  BottomModal,
  Chart,
  Icon,
  RadioButtonOptions,
  SwitchActionButton,
} from '@components';
import {MainLayout} from '@hoc';
import {useAppTheme} from '@theme';
import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';

enum CURRENCY {
  USD = 'USD',
  EGP = 'EGP',
  EUR = 'EUR',
}

enum DURATION {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  THREEMONTHS = 'THREEMONTHS',
  YEAR = 'YEAR',
  FIVEYEARS = 'FIVEYEARS',
}

const Home = () => {
  const {t} = useTranslation();
  // console.log(i18n.language);

  const durationNames: {[index in DURATION]: string} = useMemo(() => {
    return {
      [DURATION.DAY]: t('duration.day') as string,
      [DURATION.WEEK]: t('duration.week') as string,
      [DURATION.MONTH]: t('duration.month') as string,
      [DURATION.THREEMONTHS]: t('duration.threeMonths') as string,
      [DURATION.YEAR]: t('duration.year') as string,
      [DURATION.FIVEYEARS]: t('duration.fiveYears') as string,
    };
  }, [t]);

  const currencyNames: {[index in CURRENCY]: string} = useMemo(() => {
    return {
      [CURRENCY.USD]: t('currency.usd') as string,
      [CURRENCY.EUR]: t('currency.eur') as string,
      [CURRENCY.EGP]: t('currency.egp') as string,
    };
  }, [t]);
  const [fromSelection, setFromSelection] = useState<CURRENCY>(CURRENCY.USD);
  const [toSelection, setToSelection] = useState<CURRENCY>(CURRENCY.EGP);
  const [durationSelection, setDurationSelection] = useState<DURATION>(
    DURATION.MONTH,
  );
  const [isFromModalVisible, setIsFromModalVisible] = useState(false);
  const [isToModalVisible, setIsToModalVisible] = useState(false);
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false);

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

  const [data, setData] = useState([
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
  ]);

  const resetData = useCallback(() => {
    setData([
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ]);
  }, [setData]);

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
            resetData();
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
    resetData,
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
            resetData();
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
    resetData,
  ]);

  const durationModal = useMemo(() => {
    return (
      <BottomModal
        isVisible={isDurationModalVisible}
        setIsVisible={setIsDurationModalVisible}>
        <RadioButtonOptions
          value={durationSelection}
          setValue={newValue => {
            setDurationSelection(newValue as DURATION);
            setIsDurationModalVisible(false);
            resetData();
          }}
          labels={Object.keys(durationNames).map(duration => {
            const _duration = duration as DURATION;
            return {label: durationNames[_duration], value: _duration};
          })}
        />
      </BottomModal>
    );
  }, [
    isDurationModalVisible,
    setIsDurationModalVisible,
    durationSelection,
    setDurationSelection,
    resetData,
    durationNames,
  ]);

  const colors = useAppTheme().colors;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //wait(2000).then(() => setRefreshing(false));
    setTimeout(() => {
      setRefreshing(false);
      resetData();
    }, 1000);
  }, [resetData, setRefreshing]);

  return (
    <ScrollView
      className="self-stretch"
      contentContainerStyle={{
        alignSelf: 'stretch',
        alignItems: 'stretch',
        gap: 20,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Chart data={data} />
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
        <SwitchActionButton
          style={{width: 48}}
          onPress={() => {
            reverse();
            resetData();
          }}>
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

      <SwitchActionButton
        style={{alignSelf: 'stretch'}}
        onPress={() => {
          setIsDurationModalVisible(true);
        }}>
        <Text style={{color: colors.normalText}} className="font-bold">
          {durationNames[durationSelection]}
        </Text>
      </SwitchActionButton>

      {fromCurrencyModal}
      {toCurrencyModal}
      {durationModal}
    </ScrollView>
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
