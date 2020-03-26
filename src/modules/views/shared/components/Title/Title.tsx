import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

import styles from './styles';

export interface ITitleProps {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

export default class Title extends React.PureComponent<ITitleProps> {
  public render() {
    const { children, style } = this.props;
    return (
      <Text style={[styles.title, style]}>{children}</Text>
    );
  }
}
