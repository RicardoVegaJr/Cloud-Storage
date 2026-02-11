import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { authorize, checkToken, register } from "./auth/auth";
// import Dashboard from "./components/Dashboard";

function App() {
  const onLogin = async (email, password) => {
    const result = await authorize(email, password);
    if (result && result.token) {
      localStorage.setItem("token", result.token);
      await checkToken(result.token);
    }
    return result;
  };

  const onSignup = async (name, email, password) => {
    const result = await register(name, email, password);
    if (result && result.token) {
      localStorage.setItem("token", result.token);
      await checkToken(result.token);
    }
    return result;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main onLogin={onLogin} onSignup={onSignup} />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;