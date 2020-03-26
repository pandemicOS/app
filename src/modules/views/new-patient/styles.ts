import { StyleSheet, Platform } from 'react-native';
import { STYLE } from '../../../constants';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: STYLE.COLOR.WHITE,
  },
  contentContainer: {
    backgroundColor: STYLE.COLOR.WHITE,
  },
  container: {
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginTop: 15,
  },
  subtitle: {
    marginTop: 10
  },
  subtitleText: {
    flexDirection: 'row'
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
    fontSize: 14,
    color: STYLE.COLOR.DARK_GRAY,
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
    shadowColor: STYLE.COLOR.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2
  },
  buttonsContainer: {
    width: '100%',
    padding: 30,
    backgroundColor: STYLE.COLOR.WHITE_SMOKE,
    alignSelf: 'flex-end'
  },
});
