import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
// import Dashboard from "./components/Dashboard";



function App() {

const onLogin = () => {
    // navigate("/dashboard");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main onLogin={onLogin} />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;