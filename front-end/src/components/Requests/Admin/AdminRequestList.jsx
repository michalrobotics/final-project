import AdminRequestItem from "./AdminRequestItem";
import classes from '../RequestList.module.css';

const AdminRequestList = (props) => {
   return (
      <>
         <ul className={classes['request-list']}>
            {props.requests.map((request) => (
               <li key={request._id}>
                  <AdminRequestItem request={request} showUser showDate />
               </li>
            ))}
         </ul>
      </>
   );
}

export default AdminRequestList;
