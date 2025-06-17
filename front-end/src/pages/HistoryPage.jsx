import { useState, useContext, useEffect, useMemo } from "react";

import UserContext from "../store/user-context";
import useHttp from "../hooks/use-http";
import RequestList from "../components/Requests/RequestList";
import LoadingSpinner from '../components/UI/LoadingSpinner';

const HistoryPage = () => {
   const { sendRequest, isLoading } = useHttp();

   const { token } = useContext(UserContext);

   const [requests, setRequests] = useState([]);
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   const filteredRequests = useMemo(() => {
      let filtered = [...requests];
      if (startDate !== '') {
         const startDateObj = new Date(startDate);
         filtered = filtered.filter((request) => (
            startDateObj <= new Date(request.createdAt)
         ));
      }
      if (endDate !== '') {
         const endDateObj = new Date(endDate).setHours(23, 59, 59);
         filtered = filtered.filter((request) => (
            endDateObj >= new Date(request.createdAt)
         ));
      }
      return filtered;
   }, [startDate, endDate, requests]);

   const startDateChangeHandler = (event) => {
      setStartDate(event.target.value);
   }
   
   const endDateChangeHandler = (event) => {
      setEndDate(event.target.value);
   }

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

   const loadMore = () => {
      sendRequest({
         url: `http://localhost:8000/requests?state=approved,rejected&skip=${requests.length}`,
         headers: {
            'Authorization': token
         }
      }, (data) => {
         setRequests([...requests, ...data]);
      });
   }

   if (isLoading) {
      return <LoadingSpinner />;
   }

   if (filteredRequests.length === 0) {
      return <p>כאן תופיע הסטוריית הבקשות.</p>;
   }

   return (
      <>
         <label htmlFor="start-date">תאריך התחלה</label>
         <input type="date" id="start-date" onChange={startDateChangeHandler} value={startDate} />
         <label htmlFor="end-date">תאריך סיום</label>
         <input type="date" id="end-date" onChange={endDateChangeHandler} value={endDate} />
         <RequestList requests={filteredRequests} showDate showUser />
         {requests.length % 50 === 0 &&
            <p onClick={loadMore}>טען עוד...</p>
         }
      </>
   );
}

export default HistoryPage;
