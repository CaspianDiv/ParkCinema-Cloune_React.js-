import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import DataContext from './context/DataContext.jsx';
import AuthContext from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DataContext>
            <AuthContext>
                <App />
            </AuthContext>
        </DataContext>
    </BrowserRouter>
);
