import { connect } from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import Questionnaire from './Questionnaire';
import { IRootState } from '../../state-mgmt/rootState';
import { questionState } from '../../state-mgmt/question';
import { QuestionModel } from '../../models';

export const mapStateToProps = (state: IRootState) => ({
  questionList: state.question.questionList,
  answerList: state.question.answerList,
  collectedWarningList: state.question.collectedWarningList,
});

export const mapDispatchToProps = dispatch => ({
  answer: (question: QuestionModel.IQuestion, optionIndex: number) => dispatch(questionState.actions.startSetAnswer(question, optionIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
