import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import DashboardLayout from "../components/layout/DashboardLayout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Employees from "../pages/admin/Employees";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            {/* Admin Routes */}

            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["ADMIN"]}
                    />
                }
            >
                <Route element={<DashboardLayout />}>

                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />
                </Route>
                
                <Route
                    path="/admin/employees"
                    element={<Employees />}
                />                
            </Route>

            {/* Employee Routes */}

            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["EMPLOYEE"]}
                    />
                }
            >
                <Route element={<DashboardLayout />}>

                    <Route
                        path="/employee/dashboard"
                        element={<EmployeeDashboard />}
                    />

                </Route>
            </Route>

        </Routes>
    );
}

export default AppRoutes;