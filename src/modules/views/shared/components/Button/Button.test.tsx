import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Button, { IButtonProps } from './Button';
import { IMAGES } from '../../../../../constants';

describe('Button', () => {
  let props: IButtonProps;
  beforeEach(() => {
    props = {
      icon: '',
      text: '',
      isLoading: false,
      onPress: jest.fn(),
    };
  });
  it('renders without crashing', () => {
    const rendered = renderer.create(<Button {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders without crashing with ActivityIndicator', () => {
    props.isLoading = true;
    const rendered = renderer.create(<Button {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should handle onPress', async () => {
    const wrapper = shallow(<Button {...props} />);
    await (wrapper.find('TouchableOpacity').first().prop('onPress') as any)();
    expect(props.onPress).toBeCalled();
  });

  it('should render without onPress', async () => {
    props.onPress = undefined;
    const rendered = renderer.create(<Button {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should render with icon', async () => {
    props.icon = 'LOGIN';
    const rendered = renderer.create(<Button {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
