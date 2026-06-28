import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { getDashboard } from "../../services/dashboardService";
import ClaimTable from "../../components/common/ClaimTable";

function EmployeeDashboard() {
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
            label: "My Claims",
            value: dashboard.my_claims,
            color: "#6366F1",
            bg: "#EEF2FF",
            icon: (
                <svg width="28" height="28" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24">
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
                    Employee Dashboard
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748B" }}>
                    Track your expense claims
                </p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                marginBottom: "28px",
            }}>
                {statCards.map(({ label, value, color, bg, icon }) => (
                    <div key={label} style={{
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                        border: "1px solid #F1F5F9",
                    }}>
                        <div style={{
                            width: "52px", height: "52px", borderRadius: "12px",
                            background: bg, display: "flex",
                            alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                            {icon}
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: "13px", color: "#64748B", fontWeight: 500 }}>
                                {label}
                            </p>
                            <p style={{ margin: "4px 0 0", fontSize: "26px", fontWeight: 700, color: "#0F172A", lineHeight: 1 }}>
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Amount Claimed — wider standalone card */}
            <div style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                border: "1px solid #F1F5F9",
                marginBottom: "40px",
                maxWidth: "360px",
            }}>
                <div style={{
                    width: "52px", height: "52px", borderRadius: "12px",
                    background: "#ECFEFF", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                    <svg width="28" height="28" fill="none" stroke="#06B6D4" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                </div>
                <div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#64748B", fontWeight: 500 }}>
                        Total Amount Claimed
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: "24px", fontWeight: 700, color: "#0F172A", lineHeight: 1 }}>
                        ₹ {dashboard.total_amount_claimed}
                    </p>
                </div>
            </div>

            <div>
                <h4 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600, color: "#0F172A" }}>
                    Recent Claims
                </h4>
                <ClaimTable
                    mode="employee-dashboard"
                    title={null}
                    claims={dashboard.recent_claims}
                />
            </div>
        </div>
    );
}

export default EmployeeDashboard;