
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Switch,
} from 'react-native';
import { NavigationScreenProp, NavigationScreenOptions, NavigationActions, StackActions } from 'react-navigation';
import { ActionSheetProps, useActionSheet } from '@expo/react-native-action-sheet';

import { Title, Button, Input, Picker, Subtitle } from '../shared/components';
import styles from './styles';
import BigButton from '../shared/components/BigButton';
import { STYLE } from '../../../constants';
import { THEME } from '../../../constants/theme';
import { QuestionModel } from '../../../modules/models';

const genderLabels = ['Masculino', 'Femenino', 'Otro', 'Cancelar'];
const genderValues = ['M', 'F', 'X'];

export interface INewPatientProps {
  isLoading: boolean;
  hasError: boolean;
  questionList: QuestionModel.IQuestion[];
  navigation: NavigationScreenProp<any, any>;
  createPatient: (fullname: string, age: string, gender: string, email: string, phone: string) => void;
}

export interface INewPatientState {
  fullName: string;
  age: string;
  phoneNumber: string;
  gender: 'M' | 'F' | 'X';
  email: string;
}

export default class NewPatient extends React.PureComponent<INewPatientProps & ActionSheetProps, INewPatientState> {
  public state: INewPatientState = {
    fullName: '',
    age: '',
    gender: undefined,
    phoneNumber: '',
    email: '',
  };

  public fullNameInput: Input;
  public ageInput: Input;
  public genderPicker: Picker;
  public phoneNumberInput: Input;
  public emailInput: Input;
  public scrollView: ScrollView;

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

  public handlePress() {
    this.props.showActionSheetWithOptions(
      {
        title: 'Seleccione su género',
        options: ['Masculino', 'Femenino', 'Otro', 'Cancelar'],
        cancelButtonIndex: 3,
      },
      this.onSelect
    );
  }

  public onSelect = (index: number) => {
    if (index < genderLabels.length) {
      this.handleOnChange('gender', genderValues[index]);
      setTimeout(() => {
        this.genderPicker.validate(genderValues[index]);
        this.emailInput.input.focus();
      }, 100);
    }
  }

  public render() {
    const { isLoading } = this.props;
    const { fullName, age, gender, phoneNumber, email } = this.state;

    return (
      <KeyboardAvoidingView style={styles.scrollView} behavior="padding">
        <ScrollView
          ref={ref => this.scrollView = ref}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <Title>Cuestionario Covid19</Title>
            <Subtitle style={{ marginTop: 10 }}>Para comenzar con el test, completa tus datos.</Subtitle>
            <View style={styles.inputContainer}>
              <Text style={styles.header}>Nombre completo</Text>
              <Input
                ref={input => this.fullNameInput = input}
                style={styles.input}
                value={fullName}
                autoCapitalize="words"
                onChangeText={(value) => this.handleOnChange('fullName', value)}
                onValidateShowError={text => text.length === 0 ? 'Campo requerido' : null}
                onSubmitEditing={() => this.ageInput.input.focus()}
              />
              <Text style={styles.header}>Edad</Text>
              <Input
                ref={input => this.ageInput = input}
                style={styles.input}
                value={age}
                keyboardType="number-pad"
                onChangeText={(value) => this.handleOnChange('age', value)}
                onValidateShowError={text => text.length === 0 ? 'Campo requerido' : null}
                onSubmitEditing={() => {
                  this.ageInput.input.blur();
                  this.genderPicker.handlePress();
                }}
              />
              <Text style={styles.header}>Género</Text>
              <Picker
                ref={picker => this.genderPicker = picker}
                style={styles.input}
                values={genderValues}
                labels={genderLabels}
                prompt="Seleccione su género"
                selectedValue={gender}
                onPress={() => this.handlePress()}
                onValidateShowError={selectedValue => selectedValue ? null : 'Campo requerido'}
              />
              <Text style={styles.header}>Email</Text>
              <Input
                ref={input => this.emailInput = input}
                style={styles.input}
                value={email}
                onChangeText={(value) => this.handleOnChange('email', value)}
                onValidateShowError={text => text.length === 0 ? 'Campo requerido' : null}
                onSubmitEditing={() => this.phoneNumberInput.input.focus()}
              />
              <Text style={styles.header}>Teléfono de contacto</Text>
              <Input
                ref={input => this.phoneNumberInput = input}
                style={styles.input}
                value={phoneNumber}
                onChangeText={(value) => this.handleOnChange('phoneNumber', value)}
                onValidateShowError={text => text.length === 0 ? 'Campo requerido' : null}
                onSubmitEditing={() => {
                  this.phoneNumberInput.input.blur();
                }}
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

  private handleOnChange(field: 'fullName' | 'age' | 'gender' | 'email' | 'phoneNumber', value: string | boolean) {
    this.setState({ [field]: value } as any);
  }

  private handleOnContinue = () => {
    const { createPatient, navigation } = this.props;
    const { fullName, age, gender, email, phoneNumber } = this.state;
    Keyboard.dismiss();
    this.fullNameInput.validate(fullName);
    this.ageInput.validate(age);
    this.genderPicker.validate(gender);
    this.emailInput.validate(email);
    this.phoneNumberInput.validate(phoneNumber);
    setTimeout(() => {
      if (this.fullNameInput.isValid() &&
          this.ageInput.isValid() &&
          this.genderPicker.isValid() &&
          this.emailInput.isValid() &&
          this.phoneNumberInput.isValid()) {
            createPatient(fullName, age, gender, email, phoneNumber);
      }
    }, 100);
  }
}
