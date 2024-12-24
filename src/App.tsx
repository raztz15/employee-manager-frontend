import { Login } from "./components/Login"
import { Routes, Route, Navigate } from "react-router-dom";
import { RegisterManagerForm } from "./components/RegisterManagerForm ";
import { EmployeeManagementDashboard } from "./components/EmployeeManagementDashboard";
import { ManageEmployees } from "./components/ManageEmployees";

function App() {

  return (
    <Routes>
      {/* Redirect from the default route to /register */}
      <Route path="/" element={<Navigate to="/register" />} />
      {/* Route for manager login */}
      <Route path="/login" element={<Login />} />
      {/* Route for manager registration */}
      <Route path="/register" element={<RegisterManagerForm />} />
      {/* Route for creating a new employee */}
      <Route path="/employee-management-dashboard" element={<EmployeeManagementDashboard />} />
      {/* Route for managing existing employees */}
      <Route path="/manage-employees" element={<ManageEmployees />} />
    </Routes>
  )
}

export default App
