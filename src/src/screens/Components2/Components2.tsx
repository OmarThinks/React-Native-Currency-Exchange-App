import {MainLayout} from '@hoc';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

const Components2 = () => {
  return (
    <View>
      <Text>Components2</Text>
    </View>
  );
};

export default () => {
  const {t} = useTranslation();

  return MainLayout(Components2, {
    title: t('screen.components2'),
    hasBackButton: true,
  });
};
