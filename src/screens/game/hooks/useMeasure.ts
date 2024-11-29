import { useEffect, useRef, useState } from 'react';

const useMeasure = (isStart: boolean) => {
  const x = useRef(-45);
  const y = useRef(227);
  let pathList: { x: number; y: number }[] = [{ x: x.current, y: y.current }];
  const [measureList, setMeasureList] = useState<{ x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isStart) {
      interval = setInterval(() => {
        x.current += 2.3;
        y.current -= 1;
        pathList.push({ x: x.current, y: y.current });
        setMeasureList([...measureList, ...pathList]);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStart]);

  return measureList;
};

export default useMeasure;
