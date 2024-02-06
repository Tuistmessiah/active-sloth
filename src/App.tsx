import { Provider, useSelector } from 'react-redux';
import { store } from './data/redux/store';

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import JournalPage from './pages/journal/journal.page';
import LoginPage from './pages/login/login.page';

import style from './app.module.scss';
import StyleUtils from './utils/style.utils';
const s = StyleUtils.styleMixer(style);

const ProtectedRoute = ({ children }: any) => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <div className={s('container')}>
        <BrowserRouter>
          <nav className={s('nav')}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/journal"
              element={
                <ProtectedRoute>
                  <JournalPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <JournalPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <JournalPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
