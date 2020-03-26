import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import styles from './styles';

export interface IBigButtonProps {
  title: string;
  subtitle?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default class BigButton extends React.PureComponent<IBigButtonProps> {
  public render() {
    const { title, disabled, subtitle, onPress, style } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style, { opacity: disabled ? 0.5 : 1 }]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </TouchableOpacity>
    );
  }
}
