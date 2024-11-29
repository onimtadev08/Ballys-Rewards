import { useEffect, useState } from 'react';

const useCount = (isStart: boolean) => {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isStart) {
      interval = setInterval(() => {
        setCount((prev) => prev + 0.03);
      }, 50);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStart]);

  return count;
};

export default useCount;
