type StorageType = "local" | "session";

const getStorage = (type: StorageType): Storage =>
  type === "local" ? localStorage : sessionStorage;

export const storage = {
  get: <T>(key: string, type: StorageType = "local"): T | null => {
    try {
      const value = getStorage(type).getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error(`Error reading ${type}Storage key "${key}"`, err);
      return null;
    }
  },

  set: (key: string, value: unknown, type: StorageType = "local"): void => {
    try {
      getStorage(type).setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error writing ${type}Storage key "${key}"`, err);
    }
  },

  remove: (key: string, type: StorageType = "local"): void => {
    try {
      getStorage(type).removeItem(key);
    } catch (err) {
      console.error(`Error removing ${type}Storage key "${key}"`, err);
    }
  },

  clear: (type: "local" | "session" | "both" = "local"): void => {
    try {
      if (type === "both") {
        sessionStorage.clear();
        localStorage.clear();
      } else {
        getStorage(type).clear();
      }
    } catch (err) {
      console.error(`Error clearing ${type}Storage`, err);
    }
  },
};