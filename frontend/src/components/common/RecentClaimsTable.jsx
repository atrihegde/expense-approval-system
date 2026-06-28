import StatusBadge from "./StatusBadge";

export default function RecentClaimsTable({ claims }) {

    const thStyle = {
        padding: "11px 16px",
        fontSize: "11px",
        fontWeight: 600,
        color: "#64748B",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        background: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        whiteSpace: "nowrap",
    };

    const tdStyle = {
        padding: "13px 16px",
        fontSize: "14px",
        color: "#334155",
        borderBottom: "1px solid #F1F5F9",
        verticalAlign: "middle",
    };

    return (
        <div style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            overflow: "hidden",
            marginTop: "24px",
            fontFamily: "'Inter', sans-serif",
        }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E8F0" }}>
                <h5 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#0F172A" }}>
                    Recent Claims
                </h5>
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>Employee</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Amount</th>
                            <th style={thStyle}>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {claims.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ ...tdStyle, textAlign: "center", color: "#94A3B8", padding: "40px 16px" }}>
                                    No claims found.
                                </td>
                            </tr>
                        ) : (
                            claims.map((claim) => (
                                <tr
                                    key={claim.id}
                                    onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                >
                                    <td style={{ ...tdStyle, fontWeight: 500, color: "#0F172A" }}>{claim.title}</td>
                                    <td style={tdStyle}>{claim.employee}</td>
                                    <td style={tdStyle}>{claim.category_name}</td>
                                    <td style={{ ...tdStyle, fontWeight: 500 }}>₹{claim.amount}</td>
                                    <td style={tdStyle}>
                                        <StatusBadge status={claim.status} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}