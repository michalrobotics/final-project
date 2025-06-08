import RequestItem from "./RequestItem";

const RequestList = (props) => {
   return (
      <div>
         {props.requests.map((request) => (
            <RequestItem request={request.request} description={request.description} status={request.status} />
         ))}
      </div>
   );
}

export default RequestList;
