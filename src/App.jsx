// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './redux/store';
import "./App.css";
import Viewall from './components/ViewAll/Viewall';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
   < Provider store={store}>
        <Router>
      <div className="app-container">
        <Navbar />
        <main >
          <Routes>
            <Route
              path="/"
              element={
                <Home/>
              }
            />
            <Route path="/view-all" element={<Viewall />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
   </Provider>
   </QueryClientProvider>
   
  );
}



export default App;