import Request from "../../models/request";
import RequestItem from "./RequestItem";
import classes from './RequestList.module.css';

type Props = {
   requests: Request[];
   showDate?: boolean;
   showUser?: boolean;
}

const RequestList: React.FC<Props> = (props) => {
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
