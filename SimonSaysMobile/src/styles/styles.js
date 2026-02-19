import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = Math.min(width * 0.38, 160);

export const COLORS = {
  background: '#FAEBD7', // antiquewhite
  one: 'rgb(209, 77, 77)',
  two: '#008B8B', // darkcyan
  three: 'rgb(148, 55, 236)',
  four: 'rgb(226, 136, 52)',
  flash: '#F5F5F5', // whitesmoke
  userPress: 'rgb(27, 163, 27)',
  startBtn: '#DEB887', // burlywood
  startBtnActive: 'rgb(253, 184, 94)',
  startBtnGlow: 'rgb(229, 173, 99)',
  gameOver: '#FF0000',
  gameOverBtn: '#D2691E', // chocolate
  text: '#333',
  white: '#FFFFFF',
  black: '#000000',
};

export const BUTTON_IDS = ['one', 'two', 'three', 'four'];

export const BUTTON_COLOR_MAP = {
  one: COLORS.one,
  two: COLORS.two,
  three: COLORS.three,
  four: COLORS.four,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
    minHeight: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: BUTTON_SIZE * 2 + 32,
    marginVertical: 20,
  },
  colorBtn: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderWidth: 3.5,
    borderColor: COLORS.black,
    borderRadius: BUTTON_SIZE * 0.25,
    margin: 6,
  },
  hintText: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 8,
    fontStyle: 'italic',
  },
  highScoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 10,
  },
  startBtn: {
    height: 52,
    minWidth: 120,
    paddingHorizontal: 28,
    borderRadius: 16,
    backgroundColor: COLORS.startBtn,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    elevation: 8,
    shadowColor: COLORS.startBtnGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  startBtnGameOver: {
    backgroundColor: COLORS.gameOverBtn,
    minWidth: 160,
  },
  startBtnText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.black,
  },
  startBtnTextGameOver: {
    color: COLORS.white,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    opacity: 0.8,
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    zIndex: 100,
  },
});

export { BUTTON_SIZE };
export default styles;
