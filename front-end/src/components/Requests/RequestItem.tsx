import classes from './RequestItem.module.css';
import ShowMoreText from '../UI/ShowMoreText';
import Request from '../../models/request';

type Props = {
   request: Request;
   showDate?: boolean;
   showUser?: boolean;
}

const RequestItem: React.FC<Props> = (props) => {
   const request = props.request;

   let date;
   if (props.showDate) {
      date = new Date(request.createdAt).toLocaleDateString();
   }

   return (
      <div className={classes['request-item']}>
         <p>{request.title}</p>
         <ShowMoreText limit="15">{request.description}</ShowMoreText>
         <p>{request.status.state}</p>
         {request.status.description &&
            <ShowMoreText limit="15">{request.status.description}</ShowMoreText>
         }
         {props.showUser &&
            <p>{request.creator.name}</p>
         }
         {props.showDate &&
            <p>{date}</p>
         }
      </div>
   );
}

export default RequestItem;
