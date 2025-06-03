import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';

const App = () => {

  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
