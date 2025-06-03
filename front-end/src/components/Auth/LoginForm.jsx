import { useRef } from 'react';

import classes from './LoginForm.module.css';

const LoginForm = () => {
   const emailInputRef = useRef();
   const passwordInputRef = useRef();

   const submitHandler = (event) => {
      event.preventDefault();
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
         {/* {!isLoading && */}
            <button>התחבר</button>
         {/* } */}
          {/* {isLoading && <p>Sending request...</p>} */}
        </div>
      </form>
    </section>
   );
}

export default LoginForm;