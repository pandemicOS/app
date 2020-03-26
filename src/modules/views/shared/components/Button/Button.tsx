import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';

import styles from './styles';
import { STYLE } from '../../../../../constants';

export interface IButtonProps {
  iconStyle?: number;
  text: string;
  secondaryText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  secondaryTextStyle?: StyleProp<TextStyle>;
  imageTintColor?: string;
}

export default class Button extends React.PureComponent<IButtonProps> {
  public render() {
    const { text, secondaryText, isDisabled, isSelected, isLoading, onPress, style, textStyle, secondaryTextStyle } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style, isDisabled ? { opacity: 0.7 } : {}, isSelected ? { backgroundColor: STYLE.COLOR.SECONDARY } : {}]}
        onPress={onPress}
        disabled={isLoading || isDisabled}
      >
        {isLoading ? (
          <ActivityIndicator animating={true} color={STYLE.COLOR.DIM_GRAY} />
        ) : (
          <View style={styles.wrapper}>
            <View style={styles.textWrapper}>
              <Text style={[styles.text, textStyle]}>{text}</Text>
              <Text style={[styles.secondaryText, secondaryTextStyle]}>{secondaryText}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
