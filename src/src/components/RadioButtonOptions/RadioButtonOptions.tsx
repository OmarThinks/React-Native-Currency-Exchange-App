import React, {memo, useMemo} from 'react';
import {RadioButton} from 'react-native-paper';
import {useAppTheme} from '@theme';

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
    const colors = useAppTheme().colors;

    const toRender = useMemo(
      () =>
        labels.map(label => (
          <RadioButton.Item
            label={label.label}
            value={label.value}
            key={label.value}
            color={colors.radioButtonChecked}
            //uncheckedColor={colors.radioButtonUnChecked}
          />
        )),
      [labels, colors],
    );

    return (
      <RadioButton.Group
        onValueChange={newValue => setValue(newValue)}
        value={value}>
        {toRender}
      </RadioButton.Group>
    );
  },
);

export default RadioButtonOptions;
