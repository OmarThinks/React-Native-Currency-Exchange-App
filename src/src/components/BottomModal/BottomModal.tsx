import {View, Text, ViewStyle, ScrollView} from 'react-native';
import React, {memo} from 'react';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';

const BottomModal = memo(
  ({
    isVisible,
    setIsVisible,
  }: {
    isVisible: boolean;
    setIsVisible: (a: boolean) => void;
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
            <View className="self-stretch items-stretch bg-slate-400">
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
              <Text className="m-5">
                Example Modal. Click outside this area to dismiss.
              </Text>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    );
  },
);

export default BottomModal;
