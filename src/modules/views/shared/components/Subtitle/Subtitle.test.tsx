import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Title, { ITitleProps } from './Title';

describe('Title', () => {
  let props: ITitleProps;
  beforeEach(() => {
    props = {
      children: 'Title'
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<Title {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
