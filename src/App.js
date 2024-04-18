import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Start/login";
import Registration from "./Pages/Start/registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Registration/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
