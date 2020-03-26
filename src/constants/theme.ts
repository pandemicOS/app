import { Dimensions, StyleSheet } from 'react-native';
import { STYLE } from './style';

export const CONTAINER_MAX_WIDTH = 600;
const screenSizeW = Dimensions.get('window').width;
const screenPadding =
  screenSizeW >= CONTAINER_MAX_WIDTH
    ? (screenSizeW - CONTAINER_MAX_WIDTH) / 2
    : 40;

// Generic navigation properties
const navigation = {
  elevation: 0,
  shadowOpacity: 0,
  shadowOffset: {
    height: 0,
    width: 0
  },
  shadowRadius: 0,
  shadowColor: 'transparent',
  borderBottomWidth: 0
};

export const THEME = {
  screenPadding: {
    paddingHorizontal: screenPadding
  },
  navHeader: {
    backgroundColor: STYLE.COLOR.WHITE,
    height: 60,
    borderBottomWidth: 0,
    elevation: 0
  },
  backButton: {
    marginLeft: 25,
    width: 40,
    height: 40,
    justifyContent: 'center'
  },
  menuButton: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center'
  },
  navHeaderTitleText: {
    fontSize: 16,
    flex: 1,
    color: STYLE.COLOR.BLACK,
    textAlign: 'center',
    alignSelf: 'center',
  },
  navHeaderGray: {
    ...navigation,
    backgroundColor: STYLE.COLOR.WHITE
  },
  navHeaderWhite: {
    ...navigation,
    backgroundColor: STYLE.COLOR.WHITE
  },
  navHeaderButton: {
    padding: 10
  },
  navLogo: {
    height: 29,
    width: 134,
    marginRight: 20
  },
  regularText: {
    color: STYLE.COLOR.DIM_GRAY,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
  },
  boldText: {
    color: STYLE.COLOR.DIM_GRAY,
    fontWeight: STYLE.FONT.WEIGHTS.BOLD,
  },
  titleText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: STYLE.FONT.WEIGHTS.BOLD,
    color: STYLE.COLOR.CURIOUS_BLUE
  },
  textError: {
    color: STYLE.COLOR.RED_CARDINAL,
    backgroundColor: 'transparent'
  },
  errorWrapper: {
    marginTop: 8,
    marginBottom: 16
  }
} as any;
