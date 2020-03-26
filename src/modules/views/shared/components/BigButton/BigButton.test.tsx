import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import BigButton, { IBigButtonProps } from './BigButton';

describe('BigButton', () => {
  let props: IBigButtonProps;
  beforeEach(() => {
    props = {
      title: '',
      subtitle: 'subtitle',
      onPress: jest.fn(),
      disabled: false,
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<BigButton {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders disabled', () => {
    props.disabled = true;
    const rendered = renderer.create(<BigButton {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders without subtitle', () => {
    props.subtitle = null;
    const rendered = renderer.create(<BigButton {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should handle onPress', async () => {
    const wrapper = shallow(<BigButton {...props} />);
    await (wrapper.find('TouchableOpacity').first().prop('onPress') as any)();
    expect(props.onPress).toBeCalled();
  });

  it('should render without onPress', async () => {
    props.onPress = undefined;
    const rendered = renderer.create(<BigButton {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
