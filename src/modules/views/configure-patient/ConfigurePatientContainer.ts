import { connect } from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import ConfigurePatient from './ConfigurePatient';
import { IRootState } from '../../state-mgmt/rootState';
import { authState } from '../../state-mgmt/auth';

export const mapStateToProps = (state: IRootState) => ({
  isLoading: state.auth.isLoading,
  hasError: state.auth.hasError
});

export const mapDispatchToProps = dispatch => ({
  getPatient: (patientId: string) => dispatch(authState.actions.setStartGetPatient(patientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurePatient);
