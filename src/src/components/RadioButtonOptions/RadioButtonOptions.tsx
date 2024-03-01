import {View, Text} from 'react-native';
import React, {memo, useMemo} from 'react';
import {RadioButton} from 'react-native-paper';

type LabelType = {
  label: string;
  value: string;
};

type LabelsType = LabelType[];

const RadioButtonOptions = memo(
  ({
    labels,
    value,
    setValue,
  }: {
    labels: LabelsType;
    value: string;
    setValue: (a: string) => void;
  }) => {
    const toRender = useMemo(
      () =>
        labels.map(label => (
          <RadioButton.Item
            label={label.label}
            value={label.value}
            key={label.value}
          />
        )),
      [labels],
    );

    return (
      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
        {toRender}
      </RadioButton.Group>
    );
  },
);

export default RadioButtonOptions;
