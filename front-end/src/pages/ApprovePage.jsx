import { useState, useContext, useEffect } from "react";

import UserContext from "../store/user-context";
import useHttp from "../hooks/use-http";
import AdminRequestList from "../components/Requests/Admin/AdminRequestList";
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ApprovePage = () => {
   const { sendRequest, isLoading } = useHttp();

   const { token } = useContext(UserContext);

   const [requests, setRequests] = useState([]);

   useEffect(() => {
      sendRequest({
         url: `http://localhost:8000/requests?state=open`,
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
      return <p>כאן יופיעו הבקשות לאישור.</p>;
   }

   return (
      <AdminRequestList requests={requests} />
   );
}

export default ApprovePage;
