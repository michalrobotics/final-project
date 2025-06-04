import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import { UserCtxProvider } from './store/user-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserCtxProvider>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </UserCtxProvider>
);
