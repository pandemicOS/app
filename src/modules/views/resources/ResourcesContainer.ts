import { connect } from 'react-redux';

import { IRootState } from '../../state-mgmt/rootState';
import Resources from './Resources';

export const mapStateToProps = (state: IRootState) => ({
  resourceList: state.question.resourceList,
});

export const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resources);
