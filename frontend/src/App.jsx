import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import LoginAdmin from './admin/Login';
import AdminDashboard from './admin/AdminDashboard';
import HomePage from './HomePage'
import Header from './components/Header';
import AdminContentEditor from './admin/Content/AdminContentEditor';
import ProtectedRoute from './admin/ProtectedRoute';
import Kontakt from './components/Kontakt';
import Footer from './components/Footer';
import Galeria from './components/Galeria';
import AdminGaleria from './admin/Galeria/AdminGaleria';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <div className={''}>
                <Header/>
                <Routes>
                    <Route path='/'>
                        <Route index element={<HomePage/>}/>
                        <Route path='kontakt' element={<Kontakt/>}/>
                        {/* <Route path='book/:id' element={<BookDetail/>}/> */}
                        {/* <Route path='wspolpraca' element={<Wspolpraca/>}/> */}
                        {/* <Route path='author/:id' element={<AuthorDetail/>}/> */}
                        {/* <Route path='admin/books' element={<AdminBooks/>}/> */}
                        <Route path='galeria' element={<Galeria/>}/>
                        <Route
                            path="admin/content"
                            element={
                                <ProtectedRoute>
                                    <AdminContentEditor/>
                                </ProtectedRoute>
                            }
                        />
                        <Route 
                            path='admin/galeria'
                            element={
                                <ProtectedRoute>
                                    <AdminGaleria/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path='login' element={<LoginAdmin/>}/>
                        <Route path='admin' element={
                            <PrivateRoute>
                                <AdminDashboard/>
                            </PrivateRoute>
                        }/>
                    </Route>
                </Routes>
                <Footer/>
        </div>
    );
}

export default App;
