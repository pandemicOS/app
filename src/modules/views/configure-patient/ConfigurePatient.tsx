
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { NavigationScreenProp, NavigationScreenOptions, NavigationActions } from 'react-navigation';

import { Title, Button, Input, Subtitle } from '../shared/components';
import styles from './styles';
import { STYLE } from '../../../constants';
import { THEME } from '../../../constants/theme';
import { QuestionModel } from '../../models';

export interface IConfigurePatientProps {
  isLoading: boolean;
  hasError: boolean;
  questionList: QuestionModel.IQuestion[];
  navigation: NavigationScreenProp<any, any>;
  getPatient: (patientId: string) => void;
}

export interface IConfigurePatientState {
  patientNumber: string;
}

export default class ConfigurePatient extends React.PureComponent<IConfigurePatientProps, IConfigurePatientState> {
  public state: IConfigurePatientState = {
    patientNumber: '',
  };

  public patientNumberInput: Input;

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
    const { isLoading } = this.props;
    const { patientNumber } = this.state;

    return (
      <KeyboardAvoidingView style={styles.scrollView} behavior="padding">
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <Title>Configurar paciente</Title>
            <Subtitle style={{ marginTop: 20 }}>Si ya tienes un número de paciente, ingresalo aquí.</Subtitle>
            <View style={styles.inputContainer}>
              <Text style={styles.header}>Número de paciente</Text>
              <Input
                ref={input => this.patientNumberInput = input}
                style={styles.input}
                value={patientNumber}
                autoCapitalize="words"
                onChangeText={(value) => this.handleOnChange('patientNumber', value)}
                onValidateShowError={text => text.length === 0 ? 'Campo requerido' : null}
                onSubmitEditing={() => this.patientNumberInput.input.blur()}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.domesticStudentButton}
            text="Continuar"
            onPress={this.handleOnContinue}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  private handleOnChange(field: 'patientNumber', value: string) {
    this.setState({ [field]: value } as any);
  }

  private handleOnContinue = () => {
    const { getPatient } = this.props;
    const { patientNumber } = this.state;
    Keyboard.dismiss();
    this.patientNumberInput.validate(patientNumber);
    setTimeout(() => {
      if (this.patientNumberInput.isValid()) {
        getPatient(patientNumber);
      }
    }, 100);
  }
}
