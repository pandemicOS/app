import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Input, { IInputProps } from './Input';
import { IMAGES } from '../../../../../constants';
import { View } from 'react-native';

jest.mock('react-native-datepicker');
jest.mock('react-native-masked-text');

describe('Input', () => {
  let props: IInputProps;
  beforeEach(() => {
    props = {
      placeholder: '',
      value: '',
      onChangeText: jest.fn(),
      icon: IMAGES.ICONS.CALENDAR,
      keyboardType: 'default',
      secureTextEntry: false,
      onSubmitEditing: jest.fn(),
      style: {}
    };
  });
  it('renders without crashing', () => {
    const rendered = renderer.create(<Input {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders with DatePicker without crashing', () => {
    props.keyboardType = 'date';
    const rendered = renderer.create(<Input {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders with DatePicker without icon', () => {
    props.keyboardType = 'date';
    props.icon = null;
    const rendered = renderer.create(<Input {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders with error', () => {
    const wrapper = shallow(<Input {...props} />);
    const elementCount = wrapper.find(View).length;
    wrapper.instance().setState({ error: 'error' });
    expect(wrapper.find(View).length).toBeGreaterThan(elementCount);
  });

  it('should call onSubmitEditing', () => {
    const wrapper = shallow(<Input {...props} />);
    (wrapper.find('TextInputMask').at(0).prop('onSubmitEditing') as any)();
    expect(props.onSubmitEditing).toBeCalled();
  });

  it('should call onEndEditing', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow(<Input {...props} />);
    (wrapper.find('TextInputMask').at(0).prop('onEndEditing') as any)({ nativeEvent: { text: 'text' } });
    const newState = wrapper.instance().state;
    expect(newState).toEqual({ error: 'error', hasValidated: true });
  });

  it('should validate with null text', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow<Input>(<Input {...props} />);
    (wrapper.find('TextInputMask').at(0).prop('onEndEditing') as any)({ nativeEvent: { text: null } });
    const newState = wrapper.instance().state;
    expect(wrapper.instance().props.onValidateShowError).toBeCalled();
  });

  it('should call onEndEditing but not validate', () => {
    const wrapper = shallow(<Input {...props} />);
    (wrapper.find('TextInputMask').at(0).prop('onEndEditing') as any)({ nativeEvent: { text: 'text' } });
    const newState = wrapper.instance().state;
    expect(newState).toEqual({ error: null, hasValidated: false });
  });

  it('should not call onSubmitEditing', () => {
    const wrapper = shallow(<Input {... {...props, onSubmitEditing: undefined}} />);
    (wrapper.find('TextInputMask').at(0).prop('onSubmitEditing') as any)();
    expect(props.onSubmitEditing).toHaveBeenCalledTimes(0);
  });

  it('should change date with onSubmitEditing', () => {
    props.keyboardType = 'date';
    const wrapper = shallow(<Input {...props} />);
    (wrapper.find('DatePicker').at(0).prop('onDateChange') as any)();
    expect(props.onChangeText).toBeCalled();
    expect(props.onSubmitEditing).toBeCalled();
  });

  it('should change date without onSubmitEditing', () => {
    props.keyboardType = 'date';
    const wrapper = shallow(<Input {... {...props, onSubmitEditing: undefined}} />);
    (wrapper.find('DatePicker').at(0).prop('onDateChange') as any)();
    expect(props.onChangeText).toBeCalled();
    expect(props.onSubmitEditing).toHaveBeenCalledTimes(0);
  });

  it('should resetValidation', () => {
    const wrapper = shallow<Input>(<Input {...props} />);
    wrapper.instance().setState({ error: 'error', hasValidated: true });
    wrapper.instance().resetValidation();
    const newState = wrapper.instance().state;
    expect(newState).toEqual({ error: null, hasValidated: false });
  });

  it('isValid with undefined onValidateShowError should return true', () => {
    const wrapper = shallow<Input>(<Input {...props} />);
    expect(wrapper.instance().isValid()).toBe(true);
  });

  it('isValid with error should return false', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow<Input>(<Input {...props} />);
    wrapper.instance().setState({ error: 'error', hasValidated: true });
    expect(wrapper.instance().isValid()).toBe(false);
  });

  it('isValid without error and previously validated should return true', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow<Input>(<Input {...props} />);
    wrapper.instance().setState({ error: null, hasValidated: true });
    expect(wrapper.instance().isValid()).toBe(true);
  });

  it('isValid without error but not previously validated should return false', () => {
    props.onValidateShowError = jest.fn().mockReturnValue('error');
    const wrapper = shallow<Input>(<Input {...props} />);
    wrapper.instance().setState({ error: null, hasValidated: false });
    expect(wrapper.instance().isValid()).toBe(false);
  });
});
