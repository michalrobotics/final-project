import classes from './RequestItem.module.css';

const RequestItem = (props) => {

   const request = props.request;

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
      </div>
   );
}

export default RequestItem;
