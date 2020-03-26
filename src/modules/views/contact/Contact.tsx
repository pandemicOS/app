import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';
import { Linking } from 'expo';

import { ENV, STYLE } from '../../../constants';
import { THEME } from '../../../constants/theme';
import styles from './styles';
import { BigButton, Title, Subtitle, Button } from '../shared/components';
import { ResourceModel, PatientModel } from '../../models';

export interface IContactProps {
  currentPatient: PatientModel.IPatient;
  resourceList: ResourceModel.IResource[];
  navigation: NavigationScreenProp<any, any>;
}

export default class Contact extends React.PureComponent<IContactProps, {}> {
  public static navigationOptions = ({ navigation }): NavigationScreenOptions => ({
    headerStyle: THEME.navHeader,
    headerTintColor: STYLE.COLOR.WHITE,
    headerRight: <Image resizeMode="contain" style={THEME.navLogo} source={require('../../../assets/images/logo-header.png')} />
  })

  public render() {
    const { currentPatient, resourceList } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Title>Números de teléfono</Title>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: STYLE.FONT.WEIGHTS.BOLD }}>Tu número de paciente es</Text>
          <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: STYLE.FONT.WEIGHTS.BOLD, color: '#FF0000' }}>{currentPatient.id}</Text>
        </View>
        <Subtitle style={{ marginTop: 30, marginBottom: 30 }}>
          {'Si estás en una emergencia, puedes llamar a los siguientes teléfonos:'}
        </Subtitle>
        <View style={{ flex: 1 }}>
          {resourceList.filter(resource => resource.resource_type === ResourceModel.Type.PHONE).map((resource, index) => (
            <Button
              key={index}
              style={styles.resourceButton}
              text={resource.name}
              onPress={() => Linking.openURL(resource.target.startsWith('tel:') ? resource.target : 'tel:' + resource.target)}
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
