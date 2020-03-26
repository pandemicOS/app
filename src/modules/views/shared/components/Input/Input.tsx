import React from 'react';
import {
  Image,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  ReturnKeyTypeOptions,
  TextInput
} from 'react-native';
import { TextInputMask, TextInputMaskTypeProp } from 'react-native-masked-text';

import styles, { customStyles } from './styles';
import { STYLE } from '../../../../../constants';

export interface IInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  icon?: number;
  keyboardType?: string;
  secureTextEntry?: boolean;
  error?: string;
  mask?: string;
  maxLength?: number;
  type?: TextInputMaskTypeProp;
  returnKeyType?: ReturnKeyTypeOptions;
  dateTimeFormat?: string;
  isDisabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  onValidateShowError?: (text: string) => string;
  onSubmitEditing?: (value?: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  onEndEditing?: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface IInputState {
  isValid: boolean;
  hasValidated: boolean;
  error: string;
}

export default class Input extends React.PureComponent<IInputProps, IInputState> {
  private static defaultProps = {
    onSubmitEditing: undefined,
    onEndEditing: undefined,
    onChangeText: undefined,
    onValidateShowError: undefined,
    children: null,
    mask: '*'.repeat(100),
    type: 'custom',
    returnKeyType: 'default',
    dateTimeFormat: 'MM/DD/YYYY',
    isDisabled: false,
    autoCapitalize: 'none',
    multiline: false,
  } as IInputProps;

  public state = {
    hasValidated: false,
    error: null
  } as IInputState;

  public input: TextInput;

  public isValid = (): boolean => {
    const { onValidateShowError } = this.props;
    const { error, hasValidated } = this.state;
    return onValidateShowError === undefined || (!error && hasValidated);
  }

  public validate = (text: string) => {
    const { onValidateShowError } = this.props;
    if (onValidateShowError) {
      this.setState({ error: onValidateShowError(text ? text.trim() : ''), hasValidated: true });
    }
  }

  public resetValidation = () => {
    this.setState({ error: null, hasValidated: false });
  }

  public render() {
    const {
      placeholder,
      value,
      onChangeText,
      icon,
      keyboardType,
      secureTextEntry,
      onEndEditing,
      onSubmitEditing,
      children,
      mask,
      maxLength,
      type,
      returnKeyType,
      dateTimeFormat,
      autoCapitalize,
      style,
      isDisabled,
      multiline,
    } = this.props;

    const { error } = this.state;

    return (
      <View>
        <View style={[styles.viewTextInput, error ? styles.invalidText : styles.validText, style, { opacity: isDisabled ? 0.5 : 1 }]}>
          {icon && (
            <View style={styles.viewIconTextInput}>
              <Image source={icon} />
            </View>
          )}
          <TextInputMask
            refInput={input => {
              this.input = input;
            }}
            type={type}
            options={type === 'datetime' ? { format: dateTimeFormat } : { mask }}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            style={[styles.textInput, icon && { paddingLeft: 10 }]}
            placeholder={placeholder}
            placeholderTextColor={STYLE.COLOR.LIGHT_GRAY}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType as KeyboardTypeOptions}
            returnKeyType={keyboardType === 'numeric' || keyboardType === 'number-pad' ? 'done' : returnKeyType}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={text => onSubmitEditing && onSubmitEditing(text)}
            onEndEditing={(event: any) => {
              this.validate(event.nativeEvent.text);
            }}
            multiline={multiline}
            editable={!isDisabled}
          />
          {children}
        </View>
        {error ? (
          <View style={styles.errorWrapper}>
            <Text style={styles.textError}>
              {error}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}
