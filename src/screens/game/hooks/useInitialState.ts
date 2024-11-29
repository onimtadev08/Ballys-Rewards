import { useEffect, useRef, type DependencyList } from 'react';

const useInitialState = (
  callBack: Function,
  depArray: DependencyList | undefined
) => {
  const inital = useRef<boolean>(false);
  useEffect(() => {
    if (inital.current) {
      callBack();
    } else {
      inital.current = true;
    }
  }, depArray);
};

export default useInitialState;
