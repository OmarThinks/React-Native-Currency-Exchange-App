import {View, Text} from 'react-native';
import React, {memo} from 'react';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';

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
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    );
  },
);

export default BottomModal;
