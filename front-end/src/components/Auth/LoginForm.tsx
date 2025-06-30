import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './LoginForm.module.css';
import useHttp from '../../hooks/use-http';
import UserContext from '../../store/user-context';
import useInput from '../../hooks/use-input';

const LoginForm: React.FC<{ onForgot: () => void }> = (props) => {
   const navigate = useNavigate();

   const { sendRequest: sendLoginRequest, error, isLoading } = useHttp();

   const { login } = useContext(UserContext);

   const [isLogin, setIsLogin] = useState(true);

   const switchAuthModeHandler = () => {
      setIsLogin(!isLogin);
   }

   const {
      value: nameValue,
      isValid: nameIsValid,
      hasError: nameHasError,
      valueChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName
   } = useInput((value) => {
      const names = value.trim().split(' ');

      return names.length >= 2;
   });

   const {
      value: idfNumValue,
      isValid: idfNumIsValid,
      hasError: idfNumHasError,
      valueChangeHandler: idfNumChangeHandler,
      inputBlurHandler: idfNumBlurHandler,
      reset: resetIdfNum
   } = useInput((value) => (
      value.length === 7
   ));

   const {
      value: emailValue,
      isValid: emailIsValid,
      hasError: emailHasError,
      valueChangeHandler: emailChangeHandler,
      inputBlurHandler: emailBlurHandler,
      reset: resetEmail
   } = useInput((value) => (
      value.includes('@')
   ));

   const {
      value: passwordValue,
      isValid: passwordIsValid,
      hasError: passwordHasError,
      valueChangeHandler: passwordChangeHandler,
      inputBlurHandler: passwordBlurHandler,
      reset: resetPassword
   } = useInput((value) => (
      value.length >= 6
   ));

   let formIsValid = false;

   if (emailIsValid && passwordIsValid) {
      formIsValid = true;
   }

   if (!isLogin) {
      if (!nameIsValid || !idfNumIsValid) {
         formIsValid = false;
      }
   }

   const submitHandler = (event: FormEvent) => {
      event.preventDefault();

      if (!formIsValid) {
         return;
      }

      const body: {
         email: string;
         password: string;
         name?: string;
         idfNum?: number
      } = {
         email: emailValue,
         password: passwordValue
      };

      let url;

      if (isLogin) {
         url = `${process.env.REACT_APP_BACK_URL}/users/login`;
      } else {
         url = `${process.env.REACT_APP_BACK_URL}/users`;
         body.name = nameValue;
         body.idfNum = +idfNumValue;
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

         resetName();
         resetIdfNum();
         resetEmail();
         resetPassword();
         navigate('/', { replace: true });
      });
   }

   return (
      <section className={classes.auth}>
         <h1>{isLogin ? 'התחברות' : 'הרשמה'}</h1>
         <form onSubmit={submitHandler}>
            {!isLogin && (
               <>
                  <div className={classes.control}>
                     <label htmlFor='name'>שם מלא</label>
                     <input
                        type='text'
                        id='name'
                        value={nameValue}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        required
                     />
                     {nameHasError && <p>נא להכניס שם מלא</p>}
                  </div>
                  <div className={classes.control}>
                     <label htmlFor='idfNum'>מספר אישי</label>
                     <input
                        type='number'
                        id='idfNum'
                        value={idfNumValue}
                        onChange={idfNumChangeHandler}
                        onBlur={idfNumBlurHandler}
                        required
                     />
                     {idfNumHasError && <p>נא להכניס מס' אישי תקין</p>}
                  </div>
               </>
            )}
            <div className={classes.control}>
               <label htmlFor='email'>כתובת אימייל</label>
               <input
                  type='email'
                  id='email'
                  value={emailValue}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  required
               />
               {emailHasError && <p>נא להכניס אימייל תקין</p>}
            </div>
            <div className={classes.control}>
               <label htmlFor='password'>סיסמה</label>
               <input
                  type='password'
                  id='password'
                  value={passwordValue}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  required
               />
               {passwordHasError && <p>סיסמה חייבת להיות באורך של 6 תווים לפחות</p>}
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
               {isLogin &&
                  <p onClick={props.onForgot}>שכחתי סיסמה</p>
               }
            </div>
         </form>
      </section>
   );
}

export default LoginForm;
