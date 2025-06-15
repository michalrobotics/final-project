import { Fragment } from "react";
import RequestItem from "./RequestItem";
import classes from './RequestList.module.css';

const RequestList = (props) => {
   return (
      <Fragment>
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
      </Fragment>
   );
}

export default RequestList;
