import { StyleSheet } from 'react-native';

import { STYLE } from '../../../../../constants';

export default StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: STYLE.COLOR.WHITE,
    borderRadius: 4,
    borderColor: STYLE.COLOR.PRIMARY,
    borderWidth: 2,
    height: 120,
    shadowColor: STYLE.COLOR.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 21,
    color: STYLE.COLOR.BLACK,
    alignSelf: 'center',
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
  },
  subtitle: {
    marginTop: '2%',
    marginHorizontal: 10,
    fontSize: 14,
    color: STYLE.COLOR.BLACK,
    alignSelf: 'center',
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    textAlign: 'center',
  }
});
