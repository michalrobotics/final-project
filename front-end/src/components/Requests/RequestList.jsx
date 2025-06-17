import RequestItem from "./RequestItem";
import classes from './RequestList.module.css';

const RequestList = (props) => {
   return (
      <>
         <ul className={classes['request-list']}>
            {props.requests.map((request) => (
               <li key={request._id}>
                  <RequestItem
                     request={request}
                     showDate={props.showDate}
                     showUser={props.showUser}
                  />
               </li>
            ))}
         </ul>
      </>
   );
}

export default RequestList;
