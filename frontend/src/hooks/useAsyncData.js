import { useEffect, useEffectEvent, useState } from "react";

export function useAsyncData(key, loader) {
  const [result, setResult] = useState({ key: null, data: null, error: null });

  const runLoader = useEffectEvent(() => loader());

  useEffect(() => {
    let ignore = false;

    runLoader()
      .then((data) => {
        if (!ignore) {
          setResult({ key, data, error: null });
        }
      })
      .catch((error) => {
        if (!ignore) {
          setResult({ key, data: null, error });
        }
      });

    return () => {
      ignore = true;
    };
  }, [key]);

  const isCurrent = result.key === key;

  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: !isCurrent,
  };
}