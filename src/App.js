import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashBoardPage from './pages/DashBoard';
import CoinPage from './pages/CoinPage';
import ComparePage from './pages/ComparePage';
import WatchListPage from './pages/WatchListPage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material";


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });


  return (
    <div>
      <ToastContainer/>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/coin/:id' element={<CoinPage/>} />
          <Route path='/compare' element={<ComparePage/>}/>
          <Route path='/watchlist' element={<WatchListPage/>}/>
          <Route path='/dashboard' element={<DashBoardPage/>}/>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
      
    </div>
  )
}

export default App;