import { useContext } from 'react';

import useHttp from '../../hooks/use-http';
import classes from './RequestItem.module.css';
import UserContext from '../../store/user-context';

const RequestItem = (props) => {
   const { sendRequest } = useHttp();

   const { token } = useContext(UserContext);

   const request = props.request;

   const approveHandler = () => {
      const send = window.confirm(`לאשר את הבקשה\n${request.title}\nשל ${request.creator.name}?`);

      if (send) {
         sendRequest({
            url: `http://localhost:8000/requests/${request._id}`,
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: {
               state: 'approved'
            }
         });
         window.location.reload();
      }
   }

   const rejectHandler = () => {
      const description = prompt(`לסרב לבקשה\n${request.title}\nשל ${request.creator.name}?\nניתן לפרט:`);
      if (description !== null) {
         sendRequest({
            url: `http://localhost:8000/requests/${request._id}`,
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: {
               state: 'rejected',
               description: description || null
            }
         });
         window.location.reload();
      }
   }

   return (
      <div className={classes['request-item']}>
         <p>{request.title}</p>
         <p>{request.description}</p>
         <p>{request.status.state}</p>
         {request.status.description &&
            <p>{request.status.description}</p>
         }
         {props.showUser &&
            <p>{request.creator.name}</p>
         }
         {props.type === 'checkbox' && (
            <div>
               <button onClick={approveHandler}>אשר</button>
               <button onClick={rejectHandler}>סרב</button>
            </div>
         )}
      </div>
   );
}

export default RequestItem;
