import { Fragment } from "react";
import RequestItem from "./RequestItem";
import classes from './RequestList.module.css';

const RequestList = (props) => {
   return (
      <Fragment>
         <ul className={classes['request-list']}>
            {props.requests.map((request) => (
               <RequestItem key={request._id} request={request.request} description={request.description} status={request.status} />
            ))}
         </ul>
      </Fragment>
   );
}

export default RequestList;
