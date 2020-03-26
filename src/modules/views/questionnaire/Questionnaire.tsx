
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
import { QuestionModel, OptionModel } from '../../models';

export interface IQuestionnaireProps {
  questionList: QuestionModel.IQuestion[];
  answerList: { question_external_id: string; option: OptionModel.IOption }[];
  collectedWarningList: string[];
  navigation: NavigationScreenProp<any, any>;
  answer: (question: QuestionModel.IQuestion, optionIndex: number) => void;
}

export interface IQuestionnaireState {
}

export default class Questionnaire extends React.PureComponent<IQuestionnaireProps & ActionSheetProps, IQuestionnaireState> {
  public state: IQuestionnaireState = {
    fullName: '',
    age: '',
    gender: undefined,
    phoneNumber: '',
    email: '',
  };

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
    const { answerList, questionList, answer, navigation } = this.props;
    const questionId = navigation.getParam('questionId');
    const question = questionList.find(item => item.external_id === questionId);
    const currentAnswer = answerList.find(item => item.question_external_id === questionId);

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.container}>
          <Title>Cuestionario Covid19</Title>
          <Subtitle style={{ marginTop: 10 }}>Ahora, contestarás algunas preguntas.</Subtitle>
          <View style={styles.inputContainer}>
            <View style={styles.card}>
              <Text style={styles.question}>{question.text}</Text>
              {question.options.map((option, index) => (
                <Button
                  key={question.external_id + option.text + index}
                  style={styles.domesticStudentButton}
                  text={option.text}
                  textStyle={{ color: STYLE.COLOR.WHITE }}
                  onPress={() => answer(question, index)}
                  isSelected={currentAnswer && index === question.options.findIndex(item => item === currentAnswer.option)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
