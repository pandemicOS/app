import { mapStateToProps, mapDispatchToProps } from './MainContainer';
import { coreState } from '../../state-mgmt/core';
import { authState } from '../../state-mgmt/auth';
import { getState } from '../../../test/entities';

describe('MainContainer', () => {
  it('should mapStateToProps, ', () => {
    const state = getState();
    expect(mapStateToProps(state)).toEqual({});
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({});
  });
});
