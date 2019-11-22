import { useRef, useEffect } from "react";

function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
