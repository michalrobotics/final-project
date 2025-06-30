import { useContext, useEffect, useReducer } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import socket from './socket';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import NewRequestForm from './components/NewRequest/NewRequestForm';
import UserContext from './store/user-context';
import MyRequestsPage from './pages/MyRequestsPage';
import ApprovePage from './pages/ApprovePage';
import HistoryPage from './pages/HistoryPage';
import NewPasswordPage from './pages/NewPasswordPage';
import Notification from './components/Prompts/Notification';

type NotifState = {
  show: boolean;
  title: string;
  description: string;
};

type Action = 
  | { type: "CLOSE" }
  | { type: "SHOW"; title: string; description: string; }

const initialNotifState: NotifState = {
  show: false,
  title: '',
  description: ''
};

const notifStateReducer = (state: NotifState, action: Action) => {
  if (action.type === 'SHOW') {
    return {show: true, title: action.title, description: action.description};
  }
  if (action.type === 'CLOSE') {
    return initialNotifState;
  }
  return state;
}

const App = () => {
  const { user } = useContext(UserContext);
  
  const [notifState, dispatch] = useReducer(notifStateReducer, initialNotifState);

  useEffect(() => {
    const onConnect = () => console.log('connected to socket');
    const onResponse = (request: string, status: string) => {
      dispatch({
        type: 'SHOW',
        title: `בקשתך ${status ? 'אושרה' : 'נדחתה'}`,
        description: `בקשתך ${<b>{request}</b>} ${status ? 'אושרה' : 'נדחתה'}`
      });
    }

    socket.on('connect', onConnect);

    socket.on('request-response', onResponse);

    return () => {
      socket.off('connect', onConnect);
    };
  }, []);

  const closeNotifHandler = () => {
    dispatch({ type: 'CLOSE' });
  }

  return (
    <div>
      {notifState.show &&
        <Notification
          onClose={closeNotifHandler}
          title={notifState.title}
          description={notifState.description}
        />
      }
      <Layout>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/reset-password' element={<NewPasswordPage />} />
          {!user &&
            <Route path='/login' element={<LoginPage />} />
          }
          {user &&
            <>
              <Route path='/requests' element={<MyRequestsPage />} />
              <Route path='/requests/create' element={<NewRequestForm />} />
              {user.isManager &&
                <>
                  <Route path='/requests/history' element={<HistoryPage />} />
                  <Route path='/requests/approve' element={<ApprovePage />} />
                </>
              }
            </>
          }
          <Route path='/*' element={<Navigate to={'/'} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
