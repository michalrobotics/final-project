import { useState, useCallback } from "react";

type ReqConfig = {
   url: string;
   method?: string;
   headers?: any;
   body?: any;
}

const useHttp = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const sendRequest = useCallback(async (reqConfig: ReqConfig, implementData: ((data: any) => void) | null) => {
      setIsLoading(true);
      setError(null);
      try {
         const response = await fetch(reqConfig.url, {
            method: reqConfig.method ? reqConfig.method : 'GET',
            headers: reqConfig.headers ? reqConfig.headers : {},
            body: reqConfig.body? JSON.stringify(reqConfig.body) : null
         });
         
         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error);
         }

         if (implementData) {
            implementData(data);
         }
      } catch (e: any) {
         setError(e.message || 'משהו השתבש, אנא נסו שוב מאוחר יותר');
      }
      setIsLoading(false);
   }, []);

   return {
      isLoading,
      error,
      sendRequest
   };
}

export default useHttp;
