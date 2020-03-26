import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginContainer from './views/login';
import MainContainer from './views/main';
import NewPatientContainer from './views/new-patient';
import QuestionnaireContainer from './views/questionnaire';
import NoPandemicContainer from './views/no-pandemic';
import QuarantineContainer from './views/quarantine';
import NeedTestContainer from './views/need-test';
import ContactContainer from './views/contact';
import ResourcesContainer from './views/resources';
import ConfigurePatientContainer from './views/configure-patient';

const LoginStack = createStackNavigator({
  Login: LoginContainer,
  NewPatient: NewPatientContainer,
  Questionnaire: QuestionnaireContainer,
  NoPandemic: NoPandemicContainer,
  Quarantine: QuarantineContainer,
  NeedTest: NeedTestContainer,
  Contact: ContactContainer,
  Resources: ResourcesContainer,
  ConfigurePatient: ConfigurePatientContainer,
});

const MenuStack = createStackNavigator(
  {
    Main: MainContainer
  },
  { initialRouteName: 'Main' }
);

const switchNavigator = createSwitchNavigator({
  LoginStack,
  MenuStack
});

export default createAppContainer(switchNavigator);
