import { Fragment } from "react";
import RequestItem from "./RequestItem";
import classes from './RequestList.module.css';

const RequestList = (props) => {
   return (
      <Fragment>
         <ul className={classes['request-list']}>
            {props.requests.map((request) => (
               <RequestItem type={props.type} key={request._id} request={request} showUser={props.showUser} />
            ))}
         </ul>
      </Fragment>
   );
}

export default RequestList;
