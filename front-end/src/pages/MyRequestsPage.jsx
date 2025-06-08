import { useContext, useEffect, useState } from "react";

import RequestList from "../components/Requests/RequestList";
import UserContext from "../store/user-context";
import useHttp from "../hooks/use-http";

const MyRequestsPage = () => {
   const { sendRequest } = useHttp();

   const [requests, setRequests] = useState([]);
   const { user, token } = useContext(UserContext);

   useEffect(() => {
      sendRequest({
         url: `http://localhost:8000/requests`,
         headers: {
            'Authorization': token
         }
      }, (data) => {
         setRequests(data);
      });
   }, [sendRequest, token]);

   return (
      <RequestList requests={requests} />
   );
}

export default MyRequestsPage;
