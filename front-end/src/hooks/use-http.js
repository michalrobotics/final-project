import { useState, useCallback } from "react";

const useHttp = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const sendRequest = useCallback(async (reqConfig, implementData) => {
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

         implementData(data);
      } catch (e) {
         setError(e.message || 'Something went wrong');
      }
      setIsLoading(false);
   }, []);

   return {
      isLoading,
      error,
      sendRequest
   }
}

export default useHttp;
