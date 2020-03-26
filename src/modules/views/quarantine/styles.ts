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
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 20,
    minHeight: 400,
  },
  buttonsContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 24,
  },
  domesticStudentButton: {
    width: '100%',
    shadowColor: STYLE.COLOR.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2
  },
});
