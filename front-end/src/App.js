import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import NewRequestForm from './components/NewRequest/NewRequestForm';
import UserContext from './store/user-context';
import MyRequestsPage from './pages/MyRequestsPage';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          {!user &&
            <Route path='/login' element={<LoginPage />} />
          }
          {user &&
            <Route path='/request' element={<NewRequestForm />} />
          }
          {user &&
            <Route path='/my-requests' element={<MyRequestsPage />} />
          }
          <Route path='/*' element={<Navigate to={'/'} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
