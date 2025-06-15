import { Fragment, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './LoginForm.module.css';
import useHttp from '../../hooks/use-http';
import UserContext from '../../store/user-context';

const LoginForm = () => {
   const navigate = useNavigate();

   const { sendRequest: sendLoginRequest, error, isLoading } = useHttp();

   const { login } = useContext(UserContext);

   const nameInputRef = useRef();
   const idfNumInputRef = useRef();
   const emailInputRef = useRef();
   const passwordInputRef = useRef();

   const [isLogin, setIsLogin] = useState(true);

   const switchAuthModeHandler = () => {
      setIsLogin(!isLogin);
   }

   const submitHandler = (event) => {
      event.preventDefault();

      let url;

      const body = {
         email: emailInputRef.current.value,
         password: passwordInputRef.current.value
      };

      if (isLogin) {
         url = 'http://localhost:8000/users/login';
      } else {
         url = 'http://localhost:8000/users';
         body.name = nameInputRef.current.value;
         body.idfNum = idfNumInputRef.current.value;
      }

      sendLoginRequest({
         url,
         method: 'POST',
         body,
         headers: {
            'Content-Type': 'application/json'
         }
      }, (data) => {
         login(data.user, data.token);
         navigate('/', { replace: true });
      });
   }

   return (
      <section className={classes.auth}>
         <h1>{isLogin ? 'התחברות' : 'הרשמה'}</h1>
         <form onSubmit={submitHandler}>
            {!isLogin && (
               <Fragment>
                  <div className={classes.control}>
                     <label htmlFor='name'>שם מלא</label>
                     <input type='text' id='name' ref={nameInputRef} required />
                  </div>
                  <div className={classes.control}>
                     <label htmlFor='idfNum'>מספר אישי</label>
                     <input type='number' id='idfNum' ref={idfNumInputRef} required />
                  </div>
               </Fragment>
            )}
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
               {isLoading && <p>מתחבר...</p>}
               {!isLoading &&
                  <button>התחבר</button>
               }
               <button
                  type='button'
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
               >
                  {isLogin ? 'אין לך חשבון? להרשמה' : 'להתחברות עם משתמש קיים'}
               </button>
            </div>
         </form>
      </section>
   );
}

export default LoginForm;
