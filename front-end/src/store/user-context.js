import { createContext, useEffect, useState } from "react";

const UserContext = createContext({
   user: null,
   token: '',
   login: (user, token) => {},
   logout: () => {}
});

export const UserCtxProvider = (props) => {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState('');

   useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);

      const storedToken = localStorage.getItem('token');
      setToken(storedToken ? storedToken : '');
   }, []);

   const loginHandler = (user, token) => {
      setUser(user);
      setToken(token);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
   }

   const logoutHandler = () => {
      setUser(null);
      setToken('');

      localStorage.removeItem('user');
      localStorage.removeItem('token');
   }

   const contextValue = {
      user,
      token,
      login: loginHandler,
      logout: logoutHandler
   };

   return (
      <UserContext.Provider value={contextValue}>
         {props.children}
      </UserContext.Provider>
   );
}

export default UserContext;
