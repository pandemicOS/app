import { StyleSheet } from 'react-native';

import { STYLE } from '../../../../../constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: STYLE.COLOR.PRIMARY,
    borderRadius: 4,
    height: 55,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: STYLE.COLOR.BLACK,
    paddingLeft: 12,
    paddingRight: 5,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
  },
  secondaryText: {
    fontSize: 12,
    marginTop: 1,
    paddingRight: 5,
    color: STYLE.COLOR.TERTIARY,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
  }
});
