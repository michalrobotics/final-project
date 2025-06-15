import classes from './RequestItem.module.css';

const RequestItem = (props) => {

   const request = props.request;

   let date;
   if (props.showDate) {
      date = new Date(request.createdAt).toLocaleDateString();
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
         {props.showDate &&
            <p>{date}</p>
         }
      </div>
   );
}

export default RequestItem;
