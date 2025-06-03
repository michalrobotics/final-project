import { Link } from 'react-router-dom';

import classes from './Navbar.module.css';

const Navbar = () => {
   return (
      <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>ביטחון מידע</div>
      </Link>
      <nav>
        <ul>
          {/* {!isLoggedIn && */}
            <li>
              <Link to='/login'>התחברות</Link>
            </li>
          {/* } */}
          {/* {isLoggedIn && ( */}
            <li>
              <Link to='/profile'>פרופיל</Link>
            </li>
          {/* )} */}
          {/* {isLoggedIn && ( */}
            <li>
              <button>התנתקות</button>
            </li>
          {/* )} */}
        </ul>
      </nav>
    </header>
   );
}

export default Navbar;
