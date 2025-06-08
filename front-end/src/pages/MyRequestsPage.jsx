import { useContext, useEffect, useState } from "react";

import RequestList from "../components/Requests/RequestList";
import UserContext from "../store/user-context";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const MyRequestsPage = () => {
   const { isLoading, sendRequest } = useHttp();

   const [requests, setRequests] = useState([]);
   const { user, token } = useContext(UserContext);

   useEffect(() => {
      sendRequest({
         url: `http://localhost:8000/requests?creator=${user._id}`,
         headers: {
            'Authorization': token
         }
      }, (data) => {
         setRequests(data);
      });
   }, [sendRequest, user, token]);

   if (isLoading) {
      return <LoadingSpinner />;
   }

   return (
      <section>
         <h2>הבקשות שלי</h2>
         <RequestList requests={requests} />
      </section>
   );
}

export default MyRequestsPage;
