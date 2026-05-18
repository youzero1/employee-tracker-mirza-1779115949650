import { useState } from 'react';
import { getItem, setItem } from '@/lib/storage';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => getItem<T>(key, initialValue));

  const setValue = (value: T) => {
    setStoredValue(value);
    setItem(key, value);
  };

  return [storedValue, setValue];
}
