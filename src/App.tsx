// React-related imports
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";

// Material-UI (MUI) related imports
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./theme/theme";
import { RootState } from "./app/Store";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const userParams = useSelector((state: RootState) => state.userParams);

  return (
    <ThemeProvider theme={userParams.isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
