const RequestItem = (props) => {
   return (
      <div>
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
