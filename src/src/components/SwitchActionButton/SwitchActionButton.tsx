import {TouchFiller} from '@components';
import {useAppTheme} from '@theme';
import React, {memo} from 'react';
import {View, ViewStyle} from 'react-native';

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

export default SwitchActionButton;
