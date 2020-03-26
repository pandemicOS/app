import { connect } from 'react-redux';

import { IRootState } from '../../state-mgmt/rootState';
import Main from './Main';

export const mapStateToProps = (state: IRootState) => ({});

export const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
