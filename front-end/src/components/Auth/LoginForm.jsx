import { useContext, useRef } from 'react';

import classes from './LoginForm.module.css';
import useHttp from '../../hooks/use-http';
import UserContext from '../../store/user-context';

const LoginForm = () => {
   const { sendRequest: sendLoginRequest, error, isLoading } = useHttp();

   const { login } = useContext(UserContext);

   const emailInputRef = useRef();
   const passwordInputRef = useRef();

   const submitHandler = (event) => {
      event.preventDefault();

      sendLoginRequest({
         url: 'http://localhost:8000/users/login',
         method: 'POST',
         body: {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value
         },
         headers: {
            'Content-Type': 'application/json'
         }
      }, (data) => {
         login(data.user, data.token);
      });
   }

   return (
      <section className={classes.auth}>
         <h1>התחברות</h1>
         <form onSubmit={submitHandler}>
            <div className={classes.control}>
               <label htmlFor='email'>כתובת אימייל</label>
               <input type='email' id='email' ref={emailInputRef} required />
            </div>
            <div className={classes.control}>
               <label htmlFor='password'>סיסמה</label>
               <input type='password' id='password' ref={passwordInputRef} required />
            </div>
            <div className={classes.actions}>
               {error &&
                  <p>שם משתמש או סיסמה לא נכונים</p>   
               }
               {!isLoading &&
               <button>התחבר</button>
               }
               {isLoading && <p>מתחבר</p>}
            </div>
         </form>
      </section>
   );
}

export default LoginForm;