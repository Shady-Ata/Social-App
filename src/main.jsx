import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CounterContextProvider from './context/counterContext.jsx';
import TokenContextProvider from './context/tokenContext.jsx';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';

const query = new QueryClient()


createRoot(document.getElementById('root')).render(
<TokenContextProvider>
   <CounterContextProvider>
   <StrictMode>
    <QueryClientProvider client={query}>
      <Toaster position="top-center"/>
    <App />
    <ReactQueryDevtools ></ReactQueryDevtools>
    </QueryClientProvider>
  </StrictMode>,
  </CounterContextProvider>
</TokenContextProvider>
 
 
)

