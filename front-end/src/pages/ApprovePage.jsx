import { useState, useContext, useEffect } from "react";

import UserContext from "../store/user-context";
import useHttp from "../hooks/use-http";
import RequestList from "../components/Requests/RequestList";

const ApprovePage = () => {
   const { sendRequest } = useHttp();

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

   return (
      <div>
         <RequestList type="checkbox" requests={requests} showUser={true} />
      </div>
   );
}

export default ApprovePage;
