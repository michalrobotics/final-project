import RequestItem from "./RequestItem";
import classes from './RequestList.module.css';

const RequestList = (props) => {
   if (props.requests.length === 0) {
      return (
         <p>עוד לא הגשת בקשות.</p>
      );
   }

   return (
      <ul className={classes['request-list']}>
         {props.requests.map((request) => (
            <RequestItem key={request._id} request={request.request} description={request.description} status={request.status} />
         ))}
      </ul>
   );
}

export default RequestList;
