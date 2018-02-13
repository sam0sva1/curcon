import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const ImageWidth = Dimensions.get('window').width / 2;

const styles = EStyleSheet.create({
  $largeContainerSize: ImageWidth,
  $largeImageSize: ImageWidth / 2,
  $smallContainerSize: ImageWidth / 2,
  $smallImageSize: ImageWidth / 4,

  container: {
    alignItems: 'center',
  },
  containerImage: {
    height: '$largeContainerSize',
    width: '$largeContainerSize',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '$largeImageSize',
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
