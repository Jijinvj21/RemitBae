import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RigthSideLayout from "./components/RigthSideLayout/RigthSideLayout";
import AddStaff from "./page/AddStaffPage/AddStaffPage";
import AddClient from "./page/AddProjectsPage/AddProjectsPage";
import ManageProductsPage from "./page/ManageProductsPage/ManageProductsPage";
import ProjectsPage from "./page/ProjectsPage/ProjectsPage";
import EmployesPage from "./page/EmployeesPage/EmployeesPage";
import QuotationGeneratorPage from "./page/QuotationGeneratorPage/QuotationGeneratorPage";
import StockJournalPage from "./page/StockJournalPage/StockJournalPage";
import SalesPage from "./page/SalesPage/SalesPage";
import PurchasePage from "./page/PurchasePage/PurchasePage";
// import ProjectPage from "./page/ProjectPage/ProjectPage";
import PaymenyIn from "./page/PaymenyIn/PaymenyIn";
import CreditNotePage from "./page/CreditNotePage/CreditNotePage";
import ProjectDataPage from "./page/ProjectDataPage/ProjectDataPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root layout */}
        <Route element={<Layout />}>
          <Route path="/admin" element={<RigthSideLayout />}>
          
          {/* <Route path="projects" element={<ProjectsPage/>} /> */}
          <Route path="employees" element={<EmployesPage/>} />
          <Route path="sales" element={<SalesPage/>} />
          <Route path="purchase" element={<PurchasePage/>} />
          <Route path="projects" element={<ProjectsPage/>} />
          <Route path="payment-in" element={<PaymenyIn/>} />
          <Route path="creadit-note" element={<CreditNotePage/>} />
          <Route path="project-data" element={<ProjectDataPage />} />


          
            <Route path="employees/add-employes" element={<AddStaff />} />
            <Route path="projects/add-projects" element={<AddClient />} />
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
