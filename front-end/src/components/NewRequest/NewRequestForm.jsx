import { useContext, useRef } from "react";
import useHttp from "../../hooks/use-http";
import UserContext from "../../store/user-context";

const NewRequestForm = (props) => {
   const { sendRequest: sendNewRequest } = useHttp();

   const { user, token } = useContext(UserContext);

   const requestInputRef = useRef();
   const descriptionInputRef = useRef();

   const submitHandler = (event) => {
      event.preventDefault();

      sendNewRequest({
         url: 'http://localhost:8000/requests',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': token
         },
         body: {
            request: requestInputRef.current.value,
            description: descriptionInputRef.current.value,
            creator: user._id
         }
      }, (data) => {
         console.log(data);
      });
   }

   return (
      <form onSubmit={submitHandler}>
         <div>
            <label htmlFor="requests">סוג בקשה</label>
            <select id="requests" ref={requestInputRef}>
               <option value="black"></option>
               <option value="code"></option>
               <option value="enter"></option>
               <option value="secret"></option>
            </select>
         </div>
         <div>
            <label htmlFor="description">פירוט</label>
            <textarea id="description" ref={descriptionInputRef} />
         </div>
         <button>שלח</button>
      </form>
   );
}

export default NewRequestForm;
