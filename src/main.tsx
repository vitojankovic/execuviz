import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store';
import App from './App';

const root = document.getElementById('root');
const rootElement = (
 <Router>
   <Provider store={store}>
     <App />
   </Provider>
 </Router>
);

createRoot(root).render(rootElement);