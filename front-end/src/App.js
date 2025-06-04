import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';

const App = () => {

  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
