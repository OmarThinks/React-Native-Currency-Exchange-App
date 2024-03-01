import {BottomModal, TouchFiller} from '@components';
import {MainLayout} from '@hoc';
import {useAppTheme} from '@theme';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

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
  const [isBottomModalVisible, setIsBottomModalVisible] = useState(false);

  return (
    <View>
      <Header title="Text" />
      <View>
        <TouchFiller
          onPress={() => {
            setIsBottomModalVisible(true);
          }}
        />
        <Text>Display Bottom Modal</Text>
      </View>
      <BottomModal
        isVisible={isBottomModalVisible}
        setIsVisible={setIsBottomModalVisible}>
        <Text>Hi</Text>
      </BottomModal>
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
