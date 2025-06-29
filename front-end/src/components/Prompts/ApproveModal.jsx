import Modal from "../UI/Modal";
import useHttp from '../../hooks/use-http';
import socket from "../../socket";

const ApproveModal = (props) => {
   const { sendRequest } = useHttp();
   
   const approveHandler = () => {
      sendRequest({
         url: `${process.env.REACT_APP_BACK_URL}/requests/${props.request._id}`,
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': props.token
         },
         body: {
            state: 'approved'
         }
      });

      socket.emit("request-responded", props.request.creator._id, props.request.title, true);
      props.onClose();
   }

   return (
      <Modal onClose={props.onClose}>
         <p>
            לאשר את הבקשה
            <br />
            <i>{props.request.title}</i>
            <br />
            של <i>{props.request.creator.name}</i>
         </p>
         <button onClick={props.onClose}>ביטול</button>
         <button onClick={approveHandler}>אשר</button>
      </Modal>
   );
}

export default ApproveModal;
