import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import Auth from './components/Auth';
import Store from './components/Store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <Auth />
          <Store />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
