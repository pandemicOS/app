import React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';

import styles from './styles';

export interface IMainProps {
  navigation: NavigationScreenProp<any, any>;
}

export default class Main extends React.PureComponent<IMainProps, {}> {
  public static navigationOptions: NavigationScreenOptions = {
    title: 'Main'
  };

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading1}>Main</Text>
      </View>
    );
  }
}
