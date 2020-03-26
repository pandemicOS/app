import React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';
import * as Location from 'expo-location';

import { ENV, STYLE } from '../../../constants';
import { THEME } from '../../../constants/theme';
import styles from './styles';
import { BigButton, Title, Subtitle, Button } from '../shared/components';
import { PatientModel, TestModel, OptionModel } from '../../../modules/models';

export interface IQuarantineProps {
  isLoading: boolean;
  answerList: { question_external_id: string; option: OptionModel.IOption }[];
  currentPatient: PatientModel.IPatient;
  reset: (lat: string, long: string, result: boolean, state: string, answers: { option_id: number }[]) => void;
  navigation: NavigationScreenProp<any, any>;
}

export default class Quarantine extends React.PureComponent<IQuarantineProps, {}> {
  public static navigationOptions = ({ navigation }): NavigationScreenOptions => ({
    headerStyle: THEME.navHeader,
    headerTintColor: STYLE.COLOR.WHITE,
    headerRight: <Image resizeMode="contain" style={THEME.navLogo} source={require('../../../assets/images/logo-header.png')} />
  })

  public async componentDidMount() {
    const location = await Location.getCurrentPositionAsync({});
    const { answerList } = this.props;
    this.props.reset(location ? location.coords.latitude.toString() : '', location ? location.coords.latitude.toString() : '', true, TestModel.Status.QUARANTINE, answerList.map(answer => { return { option_id: answer.option.index } })); // tslint:disable-line
  }

  public render() {
    const { currentPatient, isLoading } = this.props;

    return (
      <View style={styles.container}>
        <Title>Haz cuarentena y aíslate.</Title>
        <Subtitle style={{ marginTop: 20 }}>
          {'Eres un posible caso de Covid19 positivo, pero no te encuentras entre los pacientes de riesgo. Por lo tanto, haz cuarentena y aíslate.\n\nTranquilo… todo estará bajo control.'}
        </Subtitle>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: STYLE.FONT.WEIGHTS.BOLD }}>Tu número de paciente es</Text>
          <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: STYLE.FONT.WEIGHTS.BOLD, color: '#FF0000' }}>{currentPatient.id}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.domesticStudentButton}
            text="Volver al inicio"
            textStyle={{ fontSize: 15, fontWeight: STYLE.FONT.WEIGHTS.BOLD }}
            onPress={() => this.props.navigation.navigate('Login')}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </View>
      </View>
    );
  }
}
