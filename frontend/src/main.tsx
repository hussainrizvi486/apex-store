import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import Application from './app';
import { Toaster } from 'react-hot-toast';
import './index.css';


const apiClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default apiClient;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={apiClient}>
          <Application />
        </QueryClientProvider>
      </Provider>
    </Router>
  </StrictMode>,
)
