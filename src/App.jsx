import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RigthSideLayout from "./components/RigthSideLayout/RigthSideLayout";
import AddStaff from "./page/AddStaffPage/AddStaffPage";
import AddClient from "./page/AddClientPage/AddClientPage";
import ManageProductsPage from "./page/ManageProductsPage/ManageProductsPage";
import ClientsPage from "./page/ClientsPage/ClientsPage";
import EmployesPage from "./page/EmployeesPage/EmployeesPage";
import QuotationGeneratorPage from "./page/QuotationGeneratorPage/QuotationGeneratorPage";
import StockJournalPage from "./page/StockJournalPage/StockJournalPage";
import SalesPage from "./page/SalesPage/SalesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root layout */}
        <Route element={<Layout />}>
          <Route path="/admin" element={<RigthSideLayout />}>
          
          <Route path="clients" element={<ClientsPage/>} />
          <Route path="employees" element={<EmployesPage/>} />
          <Route path="sales" element={<SalesPage/>} />




            <Route path="employees/add-employes" element={<AddStaff />} />
            <Route path="clients/add-client" element={<AddClient />} />
            <Route path="stocks" element={<ManageProductsPage />} />
            <Route path="quotation-generator" element={<QuotationGeneratorPage/>} />
            <Route path="stock-journal" element={<StockJournalPage/>} />



          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
