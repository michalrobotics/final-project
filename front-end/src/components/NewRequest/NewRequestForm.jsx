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

      const enteredRequest = requestInputRef.current.value.trim();
      const enteredDescription = descriptionInputRef.current.value.trim();

      if (enteredRequest !== '' && enteredDescription !== '') {
         sendNewRequest({
            url: 'http://localhost:8000/requests',
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: {
               request: enteredRequest,
               description: enteredDescription,
               creator: user._id
            }
         }, (data) => {
            console.log(data);
         });

         requestInputRef.current.value = '';
         descriptionInputRef.current.value = '';
      }
   }

   return (
      <form onSubmit={submitHandler}>
         <div>
            <label htmlFor="requests">סוג בקשה</label>
            <select id="requests" ref={requestInputRef}>
               <option></option>
               <option value='השחרה'>השחרה</option>
               <option value='אישור כניסה לבה"ד'>אישור כניסה לבה"ד</option>
               <option value='קידוד חוגר'>קידוד חוגר</option>
               <option value='טופס חתימה על שו"ס'>טופס חתימה על שו"ס</option>
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
