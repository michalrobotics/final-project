import { useRef } from 'react';

import socket from '../../socket';
import Modal from "../UI/Modal";
import useHttp from '../../hooks/use-http';
import Request from '../../models/request';

type Props = {
   request: Request;
   token: string;
   onClose: () => void;
}

const RejectModal: React.FC<Props> = (props) => {
   const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

   const { sendRequest } = useHttp();

   const rejectHandler = () => {
      const description = descriptionInputRef.current!.value;
      sendRequest({
         url: `${process.env.REACT_APP_BACK_URL}/requests/${props.request._id}`,
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': props.token
         },
         body: {
            state: 'rejected',
            description: description || undefined
         }
      }, null);

      socket.emit("request-responded", props.request.creator._id, props.request.title, false);
      props.onClose();
   }

   return (
      <Modal onClose={props.onClose}>
         <p>
            לסרב לבקשה
            <br />
            <i>{props.request.title}</i>
            <br />
            של <i>{props.request.creator.name}</i>
            <br />
            ניתן לפרט:
            <textarea ref={descriptionInputRef} />
         </p>
         <button onClick={props.onClose}>ביטול</button>
         <button onClick={rejectHandler}>סרב</button>
      </Modal>
   );
}

export default RejectModal;
