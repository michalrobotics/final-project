import classes from './RequestItem.module.css';

const RequestItem = (props) => {
   return (
      <div className={classes['request-item']}>
         <p>{props.request}</p>
         <p>{props.description}</p>
         <p>{props.status.status}</p>
         {props.status.description &&
            <p>{props.status.description}</p>
         }
      </div>
   );
}

export default RequestItem;
