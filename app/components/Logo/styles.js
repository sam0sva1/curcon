import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const ImageWidth = Dimensions.get('window').width / 2;

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  background: {
    height: ImageWidth,
    width: ImageWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: (ImageWidth / 2),
  },
  text: {
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: -0.5,
    marginTop: 15,
    color: '$white',
  },
});

export default styles;
