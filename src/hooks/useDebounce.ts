import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debounced = useMemo(
    () =>
      debounce((value: T) => {
        setDebouncedValue(value);
      }, delay),
    [delay]
  );

  useEffect(() => {
    debounced(value);
    return () => {
      debounced.cancel();
    };
  }, [value, debounced]);

  return debouncedValue;
};
