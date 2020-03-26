import React from 'react';
import { TouchableOpacity, Text, Image, StyleProp, ViewStyle, View } from 'react-native';

import styles from './styles';

export interface IPickerProps {
  labels: string[];
  values: any[];
  selectedValue: any;
  prompt?: string;
  isDisabled?: boolean;
  onPress: () => void;
  onValidateShowError?: (selectedValue: any) => string;
  onValueChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export interface IPickerState {
  isValid: boolean;
  hasValidated: boolean;
  error: string;
}

export default class Picker extends React.Component<IPickerProps, IPickerState> {
  public state = {
    hasValidated: false,
    error: null
  } as IPickerState;

  public isValid = (): boolean => {
    const { onValidateShowError } = this.props;
    const { error, hasValidated } = this.state;
    return onValidateShowError === undefined || (!error && hasValidated);
  }

  public validate = (value: any) => {
    const { onValidateShowError } = this.props;
    if (onValidateShowError) {
      this.setState({ error: onValidateShowError(value), hasValidated: true });
    }
  }

  public resetValidation = () => {
    this.setState({ error: null, hasValidated: false });
  }

  public handlePress = () => {
    this.props.onPress();
  }

  public render() {
    const { selectedValue, style, labels, values, isDisabled, onPress } = this.props;
    const { error } = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={() => onPress()}
          style={[styles.container, style, error ? styles.invalidValue : styles.validValue, { opacity: isDisabled ? 0.5 : 1 }]}
        >
          <Text style={styles.text}>{selectedValue && labels[values.indexOf(selectedValue)]}</Text>
          <Image
            style={{ width: 15, height: 8, marginRight: 5 }}
            source={require('../../../../../assets/images/down-arrow.png')}
          />
        </TouchableOpacity>
        {error ? (
          <View style={styles.errorWrapper}>
            <Text style={styles.textError}>
              {error}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}
