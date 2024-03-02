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

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //wait(2000).then(() => setRefreshing(false));
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScrollView
      className="self-stretch"
      contentContainerStyle={{alignSelf: 'stretch', alignItems: 'stretch'}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          //enabled={enablePTR}
        />
      }>
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
