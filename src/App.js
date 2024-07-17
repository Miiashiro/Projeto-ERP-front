import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bills from "./Pages/Bills/billsToPlay";
import Home from "./Pages/Home/home";
import NewPassword from "./Pages/Start/password";
import Product from "./Pages/Product/product";
import Login from "./Pages/Start/login";
import Registration from "./Pages/Start/registration";
import Fornecedor from "./Pages/Supllier/supllier";
import Sales from "./Pages/Sales/sales";
import ModalAdd from "./Pages/Sales/PageAdd/pageAdd";
import ProtectedRouter from "./protected";
import Error from "./pageError";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Registration/>} />
        <Route path="/NovaSenha" element={<NewPassword />} />

        <Route path="" element={<ProtectedRouter />}>
          <Route path="/Home" element={<Home/>} />
          <Route path="/Produto" element={<Product/>} />
          <Route path="/Fornecedor" element={<Fornecedor />} />
          <Route path="/Conta" element={<Bills />} />
          <Route path="/Venda" element={<Sales />} />
          <Route path="/Venda/Adicionar" element={<ModalAdd />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
