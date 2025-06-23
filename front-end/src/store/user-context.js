import { createContext, useEffect, useState } from "react";
import socket from "../socket";

let logoutTimer;

const UserContext = createContext({
   user: null,
   token: '',
   login: (user, token) => {},
   logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
   const currentTime = new Date().getTime();
   const adjExpirationTime = new Date(expirationTime).getTime();

   const remainingDuration = adjExpirationTime - currentTime;

   return remainingDuration;
}

export const UserCtxProvider = (props) => {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState('');

   useEffect(() => {
      const storedExpirationDate = localStorage.getItem('expirationTime');
      const remainingTime = calculateRemainingTime(storedExpirationDate);

      if (remainingTime <= 60000) {
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         localStorage.removeItem('expirationTime');
         return;
      }
      
      logoutTimer = setTimeout(logoutHandler, remainingTime);
      
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);

      socket.emit('join', storedUser._id);
      if (storedUser.isManager) {
         socket.emit('join', 'admins');
      }
      
      const storedToken = localStorage.getItem('token');
      setToken(storedToken ? storedToken : '');
   }, []);
   
   const loginHandler = (user, token) => {
      setUser(user);
      setToken(token);

      socket.emit('join', user._id);
      if (user.isManager) {
         socket.emit('join', 'admins');
      }
      
      // enum to come
      const expiresIn = new Date(new Date().getTime() + process.env.REACT_APP_LOGIN_EXPIRATION).toISOString();
      
      const remainingTime = calculateRemainingTime(expiresIn);
      
      logoutTimer = setTimeout(logoutHandler, remainingTime);
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expiresIn);
   }
   
   const logoutHandler = () => {
      setUser(null);
      setToken('');
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');

      if (logoutTimer) {
         clearTimeout(logoutTimer);
      }
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
