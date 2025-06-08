import { Fragment, useContext } from 'react';
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
          {user &&
            <Fragment>
              {user.isManager && (
                <Fragment>
                  <li>
                    <Link to='/requests/approve'>בקשות לאישור</Link>
                  </li>
                  <li>
                    <Link to='/requests/history'>היסטוריית בקשות</Link>
                  </li>
                </Fragment>
              )}
              <li>
                <Link to='/requests/create'>בקשה חדשה</Link>
              </li>
              <li>
                <Link to='/requests'>הבקשות שלי</Link>
              </li>
              <li>
                שלום {user.name}!
              </li>
              <li>
                <button onClick={logoutHandler}>התנתקות</button>
              </li>
            </Fragment>
          }
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
