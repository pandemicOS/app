import { connect } from 'react-redux';

import { IRootState } from '../../state-mgmt/rootState';
import Contact from './Contact';
import { questionState } from '../../state-mgmt/question';

export const mapStateToProps = (state: IRootState) => ({
  resourceList: state.question.resourceList,
  currentPatient: state.auth.currentPatient,
});

export const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
