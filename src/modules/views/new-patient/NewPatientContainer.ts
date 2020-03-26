import { connect } from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import NewPatient from './NewPatient';
import { IRootState } from '../../state-mgmt/rootState';
import { authState } from '../../state-mgmt/auth';

export const mapStateToProps = (state: IRootState) => ({
  isLoading: state.auth.isLoading,
  hasError: state.auth.hasError
});

export const mapDispatchToProps = dispatch => ({
  createPatient: (fullname: string, age: string, gender: string, email: string, phone: string) => dispatch(authState.actions.setStartCreatePatient({ fullname, age, gender, email, phone })), // tslint:disable-line
});

export default connectActionSheet(connect(mapStateToProps, mapDispatchToProps)(NewPatient));
