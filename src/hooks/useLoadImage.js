import { useEffect, useState } from 'react';

export const useLoadImage = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    try {
      if (url) {
        fetch(url).then(r => {
          if(r.status == 200) {
            setIsLoaded(true);
          }
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoaded(false);
      setIsLoading(false);
    }
  }, [url]);

  return { isLoading, isLoaded};
};
