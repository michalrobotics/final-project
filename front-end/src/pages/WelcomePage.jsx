import { useContext } from 'react';

import UserContext from '../store/user-context';
import classes from './WelcomePage.module.css';

const WelcomePage = () => {
   const { user } = useContext(UserContext);

   return (
      <section className={classes.starting}>
         <h1>ברוך הבא {user ? user.name : 'אורח'}</h1>
      </section>
   );
}

export default WelcomePage;
