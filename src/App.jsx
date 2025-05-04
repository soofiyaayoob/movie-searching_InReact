// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import Viewall from "./components/ViewAll/Viewall";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer/Footer";
import Categories from "./pages/categories";
import Search from "./pages/Search"
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/view-all" element={<Viewall />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/Search" element={<Search/>} />
              </Routes>
              <footer>
              <Footer />
            </footer>
            </main>
            
          </div>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
