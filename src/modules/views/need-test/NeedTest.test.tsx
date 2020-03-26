import React from 'react';
import Main, { IMainProps } from './Main';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

describe('Main', () => {
  let props: IMainProps;
  beforeEach(() => {
    props = {
      isLoading: false,
      hasError: false,
      Main: jest.fn(),
      setNavigation: jest.fn(),
      navigation: jest.fn() as any,
      checkForUpdates: jest.fn()
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<Main {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
