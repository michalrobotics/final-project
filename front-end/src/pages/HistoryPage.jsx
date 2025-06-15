import { useState, useContext, useEffect } from "react";

import UserContext from "../store/user-context";
import useHttp from "../hooks/use-http";
import RequestList from "../components/Requests/RequestList";
import LoadingSpinner from '../components/UI/LoadingSpinner';

const HistoryPage = () => {
   const { sendRequest, isLoading } = useHttp();

   const { token } = useContext(UserContext);

   const [requests, setRequests] = useState([]);

   useEffect(() => {
      sendRequest({
         url: `http://localhost:8000/requests?state=approved,rejected`,
         headers: {
            'Authorization': token
         }
      }, (data) => {
         setRequests(data);
      });
   }, [sendRequest, token]);

   if (isLoading) {
      return <LoadingSpinner />;
   }

   if (requests.length === 0) {
      return <p>כאן תופיע הסטוריית הבקשות.</p>;
   }

   return (
      <RequestList requests={requests} showDate showUser />
   );
}

export default HistoryPage;
