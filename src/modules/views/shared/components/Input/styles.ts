import { StyleSheet } from 'react-native';

import { STYLE } from '../../../../../constants';

const styles = StyleSheet.create({
  viewTextInput: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 30,
    borderBottomWidth: 1,
    marginTop: 10,
    backgroundColor: STYLE.COLOR.INVISIBLE
  },
  viewIconTextInput: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: STYLE.COLOR.INVISIBLE
  },
  textInput: {
    width: '100%',
    color: STYLE.COLOR.BLACK,
    backgroundColor: STYLE.COLOR.INVISIBLE,
    fontSize: 16,
    minHeight: 4,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM
  },
  datePickerPlaceholder: {
    color: STYLE.COLOR.LIGHT_GRAY,
    fontWeight: 'bold'
  },
  textError: {
    textAlign: 'left',
    color: STYLE.COLOR.RED_CARDINAL,
    backgroundColor: STYLE.COLOR.INVISIBLE
  },
  errorWrapper: {
    marginTop: 8,
    marginBottom: 10
  },
  invalidText: {
    borderBottomColor: STYLE.COLOR.DARK_RED,
  },
  validText: {
    borderBottomColor: STYLE.COLOR.LIGHTEST_GRAY,
  }
});

export const customStyles = {
  dateStyle: {
    dateInput: {
      borderWidth: 0,
      alignItems: 'flex-start',
      paddingTop: 12
    },
    placeholderText: styles.datePickerPlaceholder,
    dateText: styles.textInput,
    btnTextConfirm: { color: STYLE.COLOR.CURIOUS_BLUE },
    btnTextCancel: { color: STYLE.COLOR.DARK_RED }
  }
};

export default styles;
