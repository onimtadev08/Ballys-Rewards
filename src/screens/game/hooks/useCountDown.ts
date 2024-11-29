import { useEffect, useState } from 'react';

const useCountDown = (fun: Function) => {
  const [count, setCount] = useState<number>(5);
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (count > 0) {
      interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    } else {
      fun();
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count]);
};

export default useCountDown;
