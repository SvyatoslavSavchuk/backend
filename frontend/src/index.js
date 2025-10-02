import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import App from './App';
import { F_Size_for_Site } from './constants';
import './styles/adminDashboard.css'
import './index.css'
import './styles/home.css'
import './styles/header.css'
import './styles/slider.css'
import './styles/kontakt.css'
import './styles/modalViewer.css'
import './styles/adminGaleria.css'
import './styles/galeria.css'
import './styles/footer.css'


document.documentElement.style.setProperty(
  "--f-size-for-site",
  `${F_Size_for_Site}px`
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
