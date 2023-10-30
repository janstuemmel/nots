export const getFromLocalStorage = <T = string>(key: string): T | string | null => {
  const value = localStorage.getItem(key);
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch(e) {
      return value;
    }
  }
  return null;
}
