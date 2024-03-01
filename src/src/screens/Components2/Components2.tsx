import {MainLayout} from '@hoc';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {BottomModal} from '@components';
import {useAppTheme} from '@theme';

const HR = ({height = 2}: {height?: number}) => {
  return (
    <View
      className="bg-black my-3"
      style={{
        height,
      }}
    />
  );
};

const Header = ({title = 'Title'}: {title: string}) => {
  const colors = useAppTheme().colors;

  return (
    <View>
      <HR height={4} />
      <Text
        className="font-bold text-[25px]"
        style={{color: colors.normalText}}>
        {title}
      </Text>
      <HR height={1} />
    </View>
  );
};

const Components2 = () => {
  return (
    <View>
      <Header title="Text" />
      <BottomModal />
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
