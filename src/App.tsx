import React from "react";
// @ts-ignore
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashBoardPage from "./pages/DashBoard";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/ComparePage";
import WatchListPage from "./pages/WatchListPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { CoinsProvider } from "./context/coinContext";
import { APP_ROUTES } from "./Routes/route";
import { WatchListProvider } from "./context/watchListContext";

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CoinsProvider>
          <WatchListProvider>
            <BrowserRouter>
              <Routes>
                <Route path={APP_ROUTES.BASE} element={<HomePage />} />
                <Route path={APP_ROUTES.COINPAGE} element={<CoinPage />} />
                <Route path={APP_ROUTES.COMPARE} element={<ComparePage />} />
                <Route
                  path={APP_ROUTES.WATCHLIST}
                  element={<WatchListPage />}
                />
                <Route
                  path={APP_ROUTES.DASHBOARD}
                  element={<DashBoardPage />}
                />
              </Routes>
            </BrowserRouter>
          </WatchListProvider>
        </CoinsProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
