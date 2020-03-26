import { connect } from 'react-redux';

import { IRootState } from '../../state-mgmt/rootState';
import NoPandemic from './NoPandemic';
import { questionState } from '../../state-mgmt/question';

export const mapStateToProps = (state: IRootState) => ({
  currentPatient: state.auth.currentPatient,
});

export const mapDispatchToProps = dispatch => ({
  reset: (lat: string, long: string, result: boolean, state: string, answers: { option_id: string }[]) => dispatch(questionState.actions.reset(lat, long, result, state, answers)) // tslint:disable-line
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoPandemic);
