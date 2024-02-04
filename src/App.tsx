import { Provider, useSelector } from 'react-redux';
import { store } from './data/redux/store';

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { JournalPage } from './pages/journal/journal.page';
import { LoginPage } from './pages/login/login.page';

import './app.module.css';

const ProtectedRoute = ({ children }: any) => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Provider store={store}>
            <div className="container">
                <BrowserRouter>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
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
