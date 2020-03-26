import { StyleSheet, Platform } from 'react-native';
import { STYLE } from '../../../constants';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: STYLE.COLOR.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: STYLE.COLOR.WHITE,
  },
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  inputContainer: {
    alignItems: 'center',
    paddingTop: 80,
    flex: 1,
  },
  subtitle: {
    marginTop: 10
  },
  subtitleText: {
    flexDirection: 'row'
  },
  card: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: STYLE.COLOR.WHITE,
    borderRadius: 4,
    shadowColor: STYLE.COLOR.BLACK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    padding: 20,
  },
  status: {
    marginTop: 2,
    fontSize: 24,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM
  },
  multipleInputs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  description: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    color: STYLE.COLOR.BLACK,
    lineHeight: 22,
    marginBottom: 25
  },
  offeringContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  dot: {
    backgroundColor: STYLE.COLOR.PRIMARY,
    borderRadius: 2.5,
    width: 5,
    height: 5,
    alignSelf: 'center',
  },
  offering: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    color: STYLE.COLOR.BLACK,
  },
  provider: {
    marginTop: 25,
    fontSize: 14,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    fontStyle: 'italic',
    color: STYLE.COLOR.BLACK,
  },
  willExpire: {
    marginTop: 35,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: STYLE.FONT.WEIGHTS.BOLD,
    color: STYLE.COLOR.BLACK,
  },
  expireDate: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    color: STYLE.COLOR.BLACK,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: STYLE.COLOR.LIGHTEST_GRAY
  },
  bottomButton: {
    position: 'absolute',
    left: 30,
    right: 30,
    bottom: 30
  },
  buttonsWrapper: {
    marginTop: '10%',
    flexDirection: 'column',
  },
  header: {
    marginTop: 20,
    fontSize: 13,
    color: STYLE.COLOR.DIM_GRAY,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 13,
    color: STYLE.COLOR.DIM_GRAY,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  key: {
    marginTop: 10,
    fontSize: 13,
    color: STYLE.COLOR.DIM_GRAY
  },
  value: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 13,
    fontWeight: STYLE.FONT.WEIGHTS.BOLD,
    color: STYLE.COLOR.DIM_GRAY
  },
  halfWidthInputContainer: {
    width: '47%'
  },
  input: {
    marginTop: 0
  },
  weiveButton: {
    marginTop: '7%',
  },
  textButtonBottom: {
    textAlign: 'center',
    color: STYLE.COLOR.PRIMARY,
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  domesticStudentButton: {
    width: '100%',
    marginTop: 15,
    shadowColor: STYLE.COLOR.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonsContainer: {
    marginTop: 30,
    width: '100%',
    padding: 30,
    backgroundColor: STYLE.COLOR.WHITE_SMOKE,
    alignSelf: 'flex-end'
  },
  question: {
    width: '100%',
    fontSize: 18,
    color: STYLE.COLOR.BLACK,
    fontWeight: STYLE.FONT.WEIGHTS.BOLD,
    textAlign: 'center',
    marginBottom: 5,
  }
});
