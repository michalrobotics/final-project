import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import NewRequestForm from './components/NewRequest/NewRequestForm';
import UserContext from './store/user-context';
import MyRequestsPage from './pages/MyRequestsPage';
import ApprovePage from './pages/ApprovePage';
import HistoryPage from './pages/HistoryPage';
import NewPasswordPage from './pages/NewPasswordPage';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
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
