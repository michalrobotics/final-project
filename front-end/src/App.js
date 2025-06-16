import { Fragment, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import NewRequestForm from './components/NewRequest/NewRequestForm';
import UserContext from './store/user-context';
import MyRequestsPage from './pages/MyRequestsPage';
import ApprovePage from './pages/ApprovePage';
import HistoryPage from './pages/HistoryPage';
import RecoveryPage from './pages/RecoveryPage';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/recovery' element={<RecoveryPage />} />
          {!user &&
            <Route path='/login' element={<LoginPage />} />
          }
          {user &&
            <Fragment>
              <Route path='/requests' element={<MyRequestsPage />} />
              <Route path='/requests/create' element={<NewRequestForm />} />
              {user.isManager &&
                <Fragment>
                  <Route path='/requests/history' element={<HistoryPage />} />
                  <Route path='/requests/approve' element={<ApprovePage />} />
                </Fragment>
              }
            </Fragment>
          }
          <Route path='/*' element={<Navigate to={'/'} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
