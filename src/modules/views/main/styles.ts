import { StyleSheet, Platform } from 'react-native';
import { STYLE } from '../../../constants';

export default StyleSheet.create({
  heading1: {
    color: STYLE.COLOR.PRIMARY,
    fontSize: STYLE.FONT.SIZE.HEADING_1,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'left'
  },
  container: {
    backgroundColor: STYLE.COLOR.WHITE,
    flex: 1,
    justifyContent: 'flex-start',
    padding: 24
  }
});
