import { useState } from "react";

function useLocalStorage(key: string, initialValue: string) {
  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();

  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = isBrowser && window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      // TODO: Error handling
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // TODO: Error handling
    }
  };

  return { storedValue, setValue };
}

export default useLocalStorage;
