import { useContext, useEffect, useState } from "react";

import RequestList from "../components/Requests/RequestList";
import UserContext from "../store/user-context";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Request from "../models/request";

const MyRequestsPage = () => {
   const { isLoading, sendRequest } = useHttp();

   const [requests, setRequests] = useState<Request[]>([]);
   const { user, token } = useContext(UserContext);

   useEffect(() => {
      sendRequest({
         url: `${process.env.REACT_APP_BACK_URL}/requests?creator=${user!._id}`,
         headers: {
            'Authorization': token
         }
      }, (data) => {
         setRequests(data);
      });
   }, [sendRequest, user, token]);

   let openRequests: Request[] = [];
   let closedRequests: Request[] = [];

   requests.forEach((request) => {
      if (request.status.state === 'open') {
         openRequests.push(request);
      } else {
         closedRequests.push(request);
      }
   });

   if (isLoading) {
      return <LoadingSpinner />;
   }

   if (requests.length === 0) {
      return <p>כאן יופיעו הבקשות שלך.</p>;
   }

   return (
      <section>
         <h2>הבקשות שלי</h2>
         <div>
            <h3>מחכות לאישור</h3>
            <RequestList requests={openRequests} />
         </div>
         <div>
            <h3>סגורות</h3>
            <RequestList requests={closedRequests} />
         </div>
      </section>
   );
}

export default MyRequestsPage;
