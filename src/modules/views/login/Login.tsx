import React from 'react';
import { TouchableOpacity, ActivityIndicator, View, Text, TextInput, ScrollView, Image } from 'react-native';
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';
import * as Permissions from 'expo-permissions';

import { ENV, STYLE } from '../../../constants';
import styles from './styles';
import { THEME } from '../../../constants/theme';
import { BigButton, Title, Subtitle } from '../shared/components';
import { QuestionModel, PatientModel, TestModel } from '../../../modules/models';

export interface ILoginProps {
  currentPatient: PatientModel.IPatient;
  questionList: QuestionModel.IQuestion[];
  testList: TestModel.ITest[];
  isLoading: boolean;
  hasError: boolean;
  navigation: NavigationScreenProp<any, any>;
  login: (email: string, password: string) => void;
  setNavigation: (navigation: NavigationScreenProp<any, any>) => void;
  checkForUpdates: () => void;
}

export interface ILoginState {
  email: string;
  password: string;
}

export default class Login extends React.PureComponent<ILoginProps, ILoginState> {
  public static isAndroid: boolean = ENV.PLATFORM.IS_ANDROID;

  public state: ILoginState = {
    email: '',
    password: ''
  };

  public static navigationOptions = ({ navigation }): NavigationScreenOptions => ({
    headerStyle: THEME.navHeader,
    headerTintColor: STYLE.COLOR.WHITE,
    headerLeft: (
      <TouchableOpacity style={THEME.menuButton} onPress={navigation.toggleDrawer}>
        <Image source={require('../../../assets/images/menu-icon.png')} />
      </TouchableOpacity>
    ),
    headerRight: <Image resizeMode="contain" style={THEME.navLogo} source={require('../../../assets/images/logo-header.png')} />
  })

  public componentDidMount() {
    const { setNavigation, navigation, login } = this.props;
    setNavigation(navigation);
    login('', '');
  }

  public render() {
    const { currentPatient, questionList, testList, navigation } = this.props;
    const lastTest = testList.length ? testList[testList.length - 1] : undefined;

    return (
      <ScrollView contentContainerStyle={styles.loginContainer}>
        <Title>{currentPatient ? `¡Hola, ${currentPatient.fullname}!` : '¡Hola! Estamos para ayudarte.'}</Title>
        {currentPatient ? (
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: STYLE.FONT.WEIGHTS.BOLD }}>Tu número de paciente es</Text>
            <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: STYLE.FONT.WEIGHTS.BOLD, color: '#FF0000' }}>{currentPatient.id}</Text>
          </View>
        ) : null}
        {}
        <Subtitle style={{ marginTop: 20 }}>
          {lastTest && lastTest.state === TestModel.Status.QUARANTINE ? 'Necesitas hacer cuarentena. Por favor, aislate y sigue las recomendaciones oficiales.' :
           (lastTest && lastTest.state === TestModel.Status.PENDING ? 'Te contactaremos a la brevedad para realizar el test de Covid19. Por favor, aislate y sigue las recomendaciones oficiales.' :
           'Combatamos esta pandemia del Covid19 - Coronavirus juntos. Si nos unimos todos, vamos a superarla.')}
        </Subtitle>
        <View style={styles.inputTemplate}>
          <BigButton
            title="Quiero hacer el test"
            subtitle="Completarás un cuestionario y te indicaremos los pasos a seguir."
            onPress={async () => {
              await Permissions.askAsync(Permissions.LOCATION);
              if (currentPatient) {
                navigation.navigate('Questionnaire', { questionId: questionList.find(question => question.first).external_id });
              } else {
                navigation.navigate('NewPatient');
              }
            }}
            disabled={false}
          />
          {!currentPatient ? <BigButton
            style={{ marginTop: 20 }}
            title="Configurar paciente"
            subtitle="Ingresarás tu número de paciente para darle seguimiento a tu caso."
            onPress={() => this.props.navigation.navigate('ConfigurePatient')}
            disabled={false}
          /> : null}
          <BigButton
            style={{ marginTop: 20 }}
            title="Mapa de casos reportados"
            subtitle="Visualiza en un mapa donde haya casos reportados, así evitamos contacto."
            onPress={() => this.props.navigation.navigate('')}
            disabled={false}
          />
          <BigButton
            style={{ marginTop: 20 }}
            title="Información útil"
            subtitle="Accede a enlaces oficiales y verificados con información sobre el Covid-19. Evita fake news."
            onPress={() => this.props.navigation.navigate('Resources')}
            disabled={false}
          />
        </View>
      </ScrollView>
    );
  }

  private handleOnChange(field: 'email' | 'password', value: string) {
    this.setState({ [field]: value } as any);
  }

  private login = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    login(email, password);
  };
}
