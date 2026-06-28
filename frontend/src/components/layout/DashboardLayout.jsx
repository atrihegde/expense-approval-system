import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
            <div
                className="d-flex"
                style={{
                    minHeight: "100vh",
                    background: "#f5f7fb",
                }}
            >
            <Sidebar />

            <div className="flex-grow-1">
                <Navbar />

                <div className="container-fluid p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}