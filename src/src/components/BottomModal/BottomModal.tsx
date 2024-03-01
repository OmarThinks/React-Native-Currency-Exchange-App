import React, {memo} from 'react';
import {ScrollView, View, ViewStyle, useWindowDimensions} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

const BottomModal = memo(
  ({
    isVisible,
    setIsVisible,
    children,
  }: {
    isVisible: boolean;
    setIsVisible: (a: boolean) => void;
    children: React.ReactNode;
  }) => {
    //const showModal = () => setIsVisible(true);
    const hideModal = () => setIsVisible(false);
    const {height, width} = useWindowDimensions();
    const containerStyle: ViewStyle = {
      backgroundColor: 'white',
      //padding: 20,
      maxHeight: height * 0.8,
      position: 'absolute',
      bottom: 0,
      width,
      right: 0,
      overflow: 'hidden',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    };

    return (
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <ScrollView
            style={{alignSelf: 'stretch'}}
            contentContainerStyle={{
              alignSelf: 'stretch',
              alignItems: 'stretch',
            }}>
            <View className="self-stretch items-stretch mx-4 my-4">
              {children}
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    );
  },
);

export default BottomModal;
