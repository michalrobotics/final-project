import { useState, useContext, useEffect, useMemo } from "react";

import UserContext from "../store/user-context";
import useHttp from "../hooks/use-http";
import AdminRequestList from "../components/Requests/Admin/AdminRequestList";
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ApprovePage = () => {
   const { sendRequest, isLoading } = useHttp();

   const { token } = useContext(UserContext);

   const [requests, setRequests] = useState([]);
   const [filter, setFilter] = useState();

   const filteredRequests = useMemo(() => {
      if (filter) {
         return requests.filter((request) => request.title === filter);
      }
      return requests;
   }, [requests, filter]);

   const filterChangeHandler = (event) => {
      setFilter(event.target.value);
   }

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

   if (filteredRequests.length === 0) {
      return <p>כאן יופיעו הבקשות לאישור.</p>;
   }

   return (
      <>
         <select id="requests" value={filter} onChange={filterChangeHandler}>
            <option></option>
            <option value='השחרה'>השחרה</option>
            <option value='אישור כניסה לבה"ד'>אישור כניסה לבה"ד</option>
            <option value='קידוד חוגר'>קידוד חוגר</option>
            <option value='טופס חתימה על שו"ס'>טופס חתימה על שו"ס</option>
         </select>
         <AdminRequestList requests={filteredRequests} />
      </>
   );
}

export default ApprovePage;
