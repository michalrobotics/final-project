import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './Navbar.module.css';
import UserContext from '../../store/user-context';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const logoutHandler = () => {
    logout();
  }

   return (
      <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>ביטחון מידע</div>
      </Link>
      <nav>
        <ul>
          {!user &&
            <li>
              <Link to='/login'>התחברות</Link>
            </li>
          }
          {user && (
            <li>
              שלום {user.name}!
            </li>
          )}
          {user && (
            <li>
              <button onClick={logoutHandler}>התנתקות</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
   );
}

export default Navbar;
