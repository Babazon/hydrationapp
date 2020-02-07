import AsyncStorage from '@react-native-community/async-storage';

export class Persistence<T> {

  public persist = async (item: T): Promise<void> => {
    return AsyncStorage.setItem(new Date().toTimeString(), JSON.stringify(item));
  }

  private getStorageKeys = async (): Promise<string[]> => {
    return AsyncStorage.getAllKeys();
  }

  public hydrate = async (): Promise<Array<[string, string | null]> | undefined> => {
    try {
      const keys = await this.getStorageKeys();
      return AsyncStorage.multiGet(keys);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
