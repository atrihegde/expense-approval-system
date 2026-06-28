import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import ClaimTable from "../../components/common/ClaimTable";
import { getDashboard } from "../../services/dashboardService";

function AdminDashboard() {
    const [dashboard, setDashboard] = useState(null);

    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (!dashboard) {
        return <Loader />;
    }

    const statCards = [
        {
            label: "Employees",
            value: dashboard.total_employees,
            color: "#6366F1",
            bg: "#EEF2FF",
            icon: (
                <svg width="28" height="28" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
            ),
        },
        {
            label: "Categories",
            value: dashboard.total_categories,
            color: "#10B981",
            bg: "#ECFDF5",
            icon: (
                <svg width="28" height="28" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
            ),
        },
        {
            label: "Total Claims",
            value: dashboard.total_claims,
            color: "#1E293B",
            bg: "#F1F5F9",
            icon: (
                <svg width="28" height="28" fill="none" stroke="#1E293B" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
            ),
        },
        {
            label: "Pending",
            value: dashboard.pending_claims,
            color: "#F59E0B",
            bg: "#FFFBEB",
            icon: (
                <svg width="28" height="28" fill="none" stroke="#F59E0B" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            ),
        },
        {
            label: "Approved",
            value: dashboard.approved_claims,
            color: "#10B981",
            bg: "#ECFDF5",
            icon: (
                <svg width="28" height="28" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            ),
        },
        {
            label: "Rejected",
            value: dashboard.rejected_claims,
            color: "#EF4444",
            bg: "#FEF2F2",
            icon: (
                <svg width="28" height="28" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            ),
        },
    ];

    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
            <div style={{ marginBottom: "28px" }}>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#0F172A" }}>
                    Admin Dashboard
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748B" }}>
                    Overview of all activity
                </p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "40px",
            }}>
                {statCards.map(({ label, value, color, bg, icon }) => (
                    <div key={label} style={{
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                        border: "1px solid #F1F5F9",
                    }}>
                        <div style={{
                            width: "56px", height: "56px", borderRadius: "12px",
                            background: bg, display: "flex",
                            alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                            {icon}
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: "13px", color: "#64748B", fontWeight: 500 }}>
                                {label}
                            </p>
                            <p style={{ margin: "4px 0 0", fontSize: "28px", fontWeight: 700, color: "#0F172A", lineHeight: 1 }}>
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h4 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600, color: "#0F172A" }}>
                    Recent Claims
                </h4>
                <ClaimTable
                    mode="admin-dashboard"
                    title={null}
                    claims={dashboard.recent_claims}
                />
            </div>
        </div>
    );
}

export default AdminDashboard;