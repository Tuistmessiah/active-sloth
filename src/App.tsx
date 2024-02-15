import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import { dispatch } from './data/redux/store';
import { logout } from './data/redux/reducers/user.reducer';

import JournalPage from './pages/journal/journal.page';
import LoginPage from './pages/login/login.page';
import TestPage from './pages/test/test.page';

import SysNotification from './containers/sys-notification.container';
import { Toaster } from './components/ui/toaster';
import { Button } from './components/ui/button';

import style from './app.module.scss';
import StyleUtils from './utils/style.utils';
const s = StyleUtils.styleMixer(style);

const ProtectedRoute = ({ children }: any) => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/" />;
};

function App() {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  return (
    <div className={s('container')}>
      <BrowserRouter>
        {isLoggedIn && (
          <nav className={s('nav')}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Button onClick={() => dispatch(logout())}>
              <Link to="/">Logout</Link>
            </Button>
          </nav>
        )}

        <div className={s('pages')}>
          <Routes>
            <Route path="/test" element={<TestPage />} />
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
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster />
      <SysNotification />
    </div>
  );
}

export default App;
