import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import { authorize, checkToken, register } from "./auth/auth";

function AppRoutes() {
  const navigate = useNavigate();

  const onLogin = async (email, password) => {
    const result = await authorize(email, password);
    if (result && result.token) {
      localStorage.setItem("token", result.token);
      await checkToken(result.token);
      navigate("/dashboard");
    }
    return result;
  };

  const onSignup = async (name, email, password) => {
    const result = await register(name, email, password);
    if (result && result.token) {
      localStorage.setItem("token", result.token);
      await checkToken(result.token);
      navigate("/dashboard");
    }
    return result;
  };

  return (
    <Routes>
      <Route path="/" element={<Main onLogin={onLogin} onSignup={onSignup} />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;