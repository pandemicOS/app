import React, { ReactElement } from 'react';
import SignUpFirst, { ISignUpFirstProps, ISignUpFirstState } from './SignUpFirst';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

describe('SignUpFirst', () => {
  let props: ISignUpFirstProps;
  beforeEach(() => {
    props = {
      navigation: { getParam: jest.fn().mockReturnValue('param'), navigate: jest.fn(), dispatch: jest.fn() } as any,
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<SignUpFirst {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should render headerLeft', () => {
    const navigationOptions = SignUpFirst.navigationOptions({ navigation: props.navigation });
    const headerLeft = navigationOptions.headerLeft as ReactElement<any>;
    headerLeft.props.onPress();
    expect(props.navigation.dispatch).toBeCalled();
  });

  it('should handleOnChange', () => {
    const firstName = 'name';
    const lastName = 'lastName';
    const birthDate = '1/1/2019';
    const ssn = 'ssn';
    const gender = 'male';
    const wrapper = shallow(<SignUpFirst {...props} />);
    (wrapper.find('Input').at(0).prop('onChangeText') as any)(firstName);
    (wrapper.find('Input').at(1).prop('onChangeText') as any)(lastName);
    (wrapper.find('Input').at(3).prop('onChangeText') as any)(ssn);
    (wrapper.find('Input').at(2).prop('onChangeText') as any)(birthDate);
    const state = wrapper.instance().state as ISignUpFirstState;
    expect(state.firstName).toBe(firstName);
    expect(state.lastName).toBe(lastName);
    expect(state.birthDate).toBe(birthDate);
    expect(state.ssn).toBe(ssn);
  });

  it('should pick gender', () => {
    const wrapper = shallow(<SignUpFirst {...props} />);
    (wrapper.find('Picker').first().prop('onValueChange') as any)('female');
    const state = wrapper.instance().state as ISignUpFirstState;
    expect(state.gender).toEqual('female');
  });

  it('should validate first name input', () => {
    const wrapper = shallow(<SignUpFirst {...props} />);
    const validationWithEmptyText = (wrapper.find('Input').at(0).prop('onValidateShowError') as any)('');
    const validationWithNotEmptyText = (wrapper.find('Input').at(0).prop('onValidateShowError') as any)('text');
    expect(validationWithEmptyText).not.toBeNull();
    expect(validationWithNotEmptyText).toBeNull();
  });

  it('should validate last name input', () => {
    const wrapper = shallow(<SignUpFirst {...props} />);
    const validationWithEmptyText = (wrapper.find('Input').at(1).prop('onValidateShowError') as any)('');
    const validationWithNotEmptyText = (wrapper.find('Input').at(1).prop('onValidateShowError') as any)('text');
    expect(validationWithEmptyText).not.toBeNull();
    expect(validationWithNotEmptyText).toBeNull();
  });

  it('should validate ssn input', () => {
    const wrapper = shallow(<SignUpFirst {...props} />);
    const validationWithEmptyText = (wrapper.find('Input').at(3).prop('onValidateShowError') as any)('13');
    const validationWithNotEmptyText = (wrapper.find('Input').at(3).prop('onValidateShowError') as any)('13-234-2342');
    expect(validationWithEmptyText).not.toBeNull();
    expect(validationWithNotEmptyText).toBeNull();
  });

  it('should validate date of birth input', () => {
    const wrapper = shallow(<SignUpFirst {...props} />);
    const validationWithEmptyText = (wrapper.find('Input').at(2).prop('onValidateShowError') as any)('13/40/2000');
    const validationWithNotEmptyText = (wrapper.find('Input').at(2).prop('onValidateShowError') as any)('09/11/1990');
    expect(validationWithEmptyText).not.toBeNull();
    expect(validationWithNotEmptyText).toBeNull();
  });

  it('should validate gender picker', () => {
    const wrapper = shallow(<SignUpFirst {...props} />);
    const validationWithEmptyValue = (wrapper.find('Picker').at(0).prop('onValidateShowError') as any)(undefined);
    const validationWithNotEmptyValue = (wrapper.find('Picker').at(0).prop('onValidateShowError') as any)('text');
    expect(validationWithEmptyValue).not.toBeNull();
    expect(validationWithNotEmptyValue).toBeNull();
  });

  it('should handle onContinue with valid inputs', done => {
    const wrapper = shallow(<SignUpFirst {...props} />);
    const instance = wrapper.instance() as SignUpFirst;
    instance.firstNameInput = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    instance.lastNameInput = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    instance.birthDateInput = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    instance.ssnInput = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    instance.genderPicker = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    (wrapper.find('Button').last().prop('onPress') as any)();
    setTimeout(() => {
      expect(instance.firstNameInput.validate).toHaveBeenCalled();
      expect(instance.lastNameInput.validate).toHaveBeenCalled();
      expect(instance.birthDateInput.validate).toHaveBeenCalled();
      expect(instance.ssnInput.validate).toHaveBeenCalled();
      expect(instance.genderPicker.validate).toHaveBeenCalled();
      expect(props.navigation.navigate).toBeCalled();
      done();
    }, 150);
  });

  it('should handle onContinue with invalid inputs', done => {
    const wrapper = shallow(<SignUpFirst {...props} />);
    const instance = wrapper.instance() as SignUpFirst;
    instance.firstNameInput = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(false) } as any;
    instance.lastNameInput = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    instance.birthDateInput = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    instance.ssnInput = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    instance.genderPicker = { validate: jest.fn(), isValid: jest.fn().mockReturnValue(true) } as any;
    (wrapper.find('Button').last().prop('onPress') as any)();
    setTimeout(() => {
      expect(instance.firstNameInput.validate).toHaveBeenCalled();
      expect(instance.lastNameInput.validate).toHaveBeenCalled();
      expect(instance.birthDateInput.validate).toHaveBeenCalled();
      expect(instance.ssnInput.validate).toHaveBeenCalled();
      expect(instance.genderPicker.validate).toHaveBeenCalled();
      done();
    }, 150);
  });

});
