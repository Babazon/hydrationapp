import { ImageURISource } from 'react-native';

interface IAssets {
  [key: string]: ImageURISource;
}

export const Assets: IAssets = {
  icon_locked: require('./icon_locked.png'),
  icon_minus: require('./icon_minus.png'),
  icon_plus: require('./icon_plus.png'),
  icon_unlocked: require('./icon_unlocked.png')
};
