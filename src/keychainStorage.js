import * as Keychain from 'react-native-keychain';

const SERVICE = "reduxPersist"; // service name for better separation

export const keychainStorage = {
  async setItem(key, value) {
    try {
      await Keychain.setGenericPassword(key, value, { service: SERVICE });
      return value;
    } catch (error) {
      console.error("Keychain setItem error:", error);
      throw error;
    }
  },

  async getItem(key) {
    try {
      const credentials = await Keychain.getGenericPassword({ service: SERVICE });
      if (credentials && credentials.username === key) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error("Keychain getItem error:", error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await Keychain.resetGenericPassword({ service: SERVICE });
    } catch (error) {
      console.error("Keychain removeItem error:", error);
    }
  },
};
