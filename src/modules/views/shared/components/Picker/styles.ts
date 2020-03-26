import { StyleSheet } from 'react-native';

import { STYLE } from '../../../../../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 34,
    borderBottomColor: STYLE.COLOR.LIGHTEST_GRAY,
    borderBottomWidth: 1,
    marginTop: 10,
    backgroundColor: STYLE.COLOR.INVISIBLE
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
  invalidValue: {
    borderBottomColor: STYLE.COLOR.DARK_RED,
  },
  validValue: {
    borderBottomColor: STYLE.COLOR.LIGHTEST_GRAY,
  },
  text: {
    color: STYLE.COLOR.BLACK,
    fontSize: 15,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
  }
});

export default styles;
