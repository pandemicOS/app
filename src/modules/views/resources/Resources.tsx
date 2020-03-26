import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { NavigationScreenProp, NavigationScreenOptions, NavigationActions } from 'react-navigation';
import { Linking } from 'expo';

import { ENV, STYLE } from '../../../constants';
import { THEME } from '../../../constants/theme';
import styles from './styles';
import { BigButton, Title, Subtitle, Button } from '../shared/components';
import { ResourceModel } from '../../models';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface IResourcesProps {
  resourceList: ResourceModel.IResource[];
  navigation: NavigationScreenProp<any, any>;
}

export default class Resources extends React.PureComponent<IResourcesProps, {}> {
  public static navigationOptions = ({ navigation }): NavigationScreenOptions => ({
    headerStyle: THEME.navHeader,
    headerTintColor: STYLE.COLOR.WHITE,
    headerLeft: (
      <TouchableOpacity style={THEME.backButton} onPress={() => navigation.dispatch(NavigationActions.back())}>
        <Image source={require('../../../assets/images/back-button.png')} />
      </TouchableOpacity>
    ),
    headerRight: <Image resizeMode="contain" style={THEME.navLogo} source={require('../../../assets/images/logo-header.png')} />
  })

  public render() {
    const { resourceList } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Title>Información útil</Title>
        <Subtitle style={{ marginTop: 20, marginBottom: 30 }}>
          {'En estos enlaces oficiales y verificados podrás informarte sobre el Covid19.'}
        </Subtitle>
        <View style={{ flex: 1 }}>
          {resourceList.filter(resource => resource.resource_type === ResourceModel.Type.INFO).map((resource, index) => (
            <Button
              key={index}
              style={styles.resourceButton}
              text={resource.name}
              onPress={() => Linking.openURL(resource.target.startsWith('http://') ? resource.target : 'http://' + resource.target)}
            />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.domesticStudentButton}
            text="Volver al inicio"
            textStyle={{ fontWeight: STYLE.FONT.WEIGHTS.BOLD }}
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    );
  }
}
