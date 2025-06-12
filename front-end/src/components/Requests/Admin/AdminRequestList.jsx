import { Fragment } from "react";

import AdminRequestItem from "./AdminRequestItem";
import classes from '../RequestList.module.css';

const RequestList = (props) => {

   return (
      <Fragment>
         <ul className={classes['request-list']}>
            {props.requests.map((request) => (
               <li key={request._id}>
                  <AdminRequestItem request={request} showUser={true} />
               </li>
            ))}
         </ul>
      </Fragment>
   );
}

export default RequestList;
