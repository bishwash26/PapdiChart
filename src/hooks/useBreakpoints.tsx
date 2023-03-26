import {useState, useEffect} from 'react';
import throttle from 'lodash.throttle';

const getDeviceConfig = (width:number) => {
    let isXs,isS,isMd,isLg;
  if(width < 320) {
    isXs=true;
  } else if(width >= 320 && width < 720 ) {
    isS=true;
  } else if(width >= 720 && width < 1024) {
    isMd= true;
  } else if(width >= 1024) {
    isLg = true;
  }
  return {isS:!!isS,isXs:!!isXs,isMd:!!isMd,isLg:!!isLg};
};

const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));
  
  useEffect(() => {
    const calcInnerWidth = throttle(function() {
      setBrkPnt(getDeviceConfig(window.innerWidth))
    }, 200); 
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
}
export default useBreakpoint;