import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { ActionSheet } from 'native-base';

import Picker, { IPickerProps } from './Picker';
import { View } from 'react-native';

describe('Picker', () => {
  let props: IPickerProps;
  beforeEach(() => {
    props = {
      labels: ['label1', 'label2'],
      values: ['value1', 'value2'],
      selectedValue: '',
      prompt: 'this is a prompt',
      onValueChange: jest.fn(),
      style: {}
    };

    Picker.ActionSheet = { show: jest.fn().mockReturnValue({ onSelect: jest.fn() }) } as any;
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<Picker {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders with error', () => {
    const wrapper = shallow(<Picker {...props} />);
    const elementCount = wrapper.find(View).length;
    wrapper.instance().setState({ error: 'error' });
    expect(wrapper.find(View).length).toBeGreaterThan(elementCount);
  });

  it('should handle onPress', () => {
    const wrapper = shallow(<Picker {...props} />);
    (wrapper.find('TouchableOpacity').first().prop('onPress') as any)();
    expect(Picker.ActionSheet.show).toBeCalled();
  });

  it('should handle onSelect', () => {
    const wrapper = shallow<Picker>(<Picker {...props} />);
    wrapper.instance().onSelect(0);
    expect(props.onValueChange).toBeCalledWith('value1');
    wrapper.instance().onSelect(2);
    expect(props.onValueChange).toHaveBeenCalledTimes(1);
  });

  it('should handle onSelect and validate', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow<Picker>(<Picker {...props} />);
    wrapper.instance().onSelect(0);
    expect(props.onValueChange).toBeCalledWith('value1');
    wrapper.instance().onSelect(2);
    expect(props.onValueChange).toHaveBeenCalledTimes(1);
  });

  it('should resetValidation', () => {
    const wrapper = shallow<Picker>(<Picker {...props} />);
    wrapper.instance().setState({ error: 'error', hasValidated: true });
    wrapper.instance().resetValidation();
    const newState = wrapper.instance().state;
    expect(newState).toEqual({ error: null, hasValidated: false });
  });

  it('isValid with undefined onValidateShowError should return true', () => {
    const wrapper = shallow<Picker>(<Picker {...props} />);
    expect(wrapper.instance().isValid()).toBe(true);
  });

  it('isValid with error should return false', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow<Picker>(<Picker {...props} />);
    wrapper.instance().setState({ error: 'error', hasValidated: true });
    expect(wrapper.instance().isValid()).toBe(false);
  });

  it('isValid without error and previously validated should return true', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow<Picker>(<Picker {...props} />);
    wrapper.instance().setState({ error: null, hasValidated: true });
    expect(wrapper.instance().isValid()).toBe(true);
  });

  it('isValid without error but not previously validated should return false', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow<Picker>(<Picker {...props} />);
    wrapper.instance().setState({ error: null, hasValidated: false });
    expect(wrapper.instance().isValid()).toBe(false);
  });
});
