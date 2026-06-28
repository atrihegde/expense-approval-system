const statusStyles = {
    APPROVED: { background: "#ECFDF5", color: "#059669" },
    REJECTED: { background: "#FEF2F2", color: "#DC2626" },
    SUBMITTED: { background: "#FFFBEB", color: "#D97706" },
    DRAFT: { background: "#F1F5F9", color: "#64748B" },
};

const btnBase = {
    padding: "5px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
};

const EditIcon = () => (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

const TrashIcon = () => (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <path d="M10 11v6"/><path d="M14 11v6"/>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
);

export default function ClaimTable({
    claims,
    mode = "employee",
    title = "My Claims",
    onEdit,
    onDelete,
    onSubmit,
    onApprove,
    onReject,
    onResubmit,
}) {
    const isEmployee = mode === "employee";
    const isAdmin = mode === "admin";
    const isEmployeeDashboard = mode === "employee-dashboard";
    const isAdminDashboard = mode === "admin-dashboard";
    const showEmployee = isAdmin || isAdminDashboard;
    const showReceipt = isEmployee || isAdmin;
    const showComments = isEmployee || isAdmin;
    const showActions = isEmployee || isAdmin;

    const totalColumns =
        5 +
        (showEmployee ? 1 : 0) +
        (showReceipt ? 1 : 0) +
        (showComments ? 1 : 0) +
        (showActions ? 1 : 0);

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
            fontFamily: "'Inter', sans-serif",
        }}>
            {title && (
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E8F0" }}>
                    <h5 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#0F172A" }}>
                        {title}
                    </h5>
                </div>
            )}

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            {showEmployee && <th style={thStyle}>Employee</th>}
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Amount</th>
                            {showReceipt && <th style={thStyle}>Receipt</th>}
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Status</th>
                            {showComments && <th style={thStyle}>Comments</th>}
                            {showActions && <th style={thStyle}>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {claims.length === 0 ? (
                            <tr>
                                <td colSpan={totalColumns} style={{ ...tdStyle, textAlign: "center", color: "#94A3B8", padding: "40px 16px" }}>
                                    No claims found.
                                </td>
                            </tr>
                        ) : (
                            claims.map((claim) => {
                                const s = statusStyles[claim.status] || statusStyles.DRAFT;
                                return (
                                    <tr
                                        key={claim.id}
                                        onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                    >
                                        {showEmployee && (
                                            <td style={tdStyle}>{claim.employee}</td>
                                        )}

                                        <td style={{ ...tdStyle, fontWeight: 500, color: "#0F172A" }}>
                                            {claim.title}
                                        </td>

                                        <td style={tdStyle}>{claim.category_name}</td>

                                        <td style={{ ...tdStyle, fontWeight: 500 }}>₹ {claim.amount}</td>

                                        {showReceipt && (
                                            <td style={tdStyle}>
                                                {claim.receipt_url ? (
                                                    <a
                                                        href={claim.receipt_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            ...btnBase,
                                                            background: "#EEF2FF",
                                                            color: "#6366F1",
                                                            textDecoration: "none",
                                                        }}
                                                    >
                                                        View
                                                    </a>
                                                ) : (
                                                    <span style={{ color: "#CBD5E1", fontSize: "13px" }}>—</span>
                                                )}
                                            </td>
                                        )}

                                        <td style={{ ...tdStyle, color: "#64748B" }}>{claim.expense_date}</td>

                                        <td style={tdStyle}>
                                            <span style={{
                                                display: "inline-block",
                                                padding: "3px 10px",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                background: s.background,
                                                color: s.color,
                                            }}>
                                                {claim.status}
                                            </span>
                                        </td>

                                        {showComments && (
                                            <td style={{ ...tdStyle, color: "#64748B", maxWidth: "180px" }}>
                                                {claim.manager_comments ? (
                                                    <span>{claim.manager_comments}</span>
                                                ) : (
                                                    <span style={{ color: "#CBD5E1" }}>—</span>
                                                )}
                                            </td>
                                        )}

                                        {showActions && (
                                            <td style={tdStyle}>
                                                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                                    {isEmployee && (
                                                        <>
                                                            {(claim.status === "DRAFT" || claim.status === "REJECTED") && (
                                                                <button
                                                                    style={{ ...btnBase, background: "#FFFBEB", color: "#D97706" }}
                                                                    onClick={() => onEdit(claim)}
                                                                >
                                                                    <EditIcon /> Edit
                                                                </button>
                                                            )}

                                                            {claim.status === "DRAFT" && (
                                                                <>
                                                                    <button
                                                                        style={{ ...btnBase, background: "#FEF2F2", color: "#DC2626" }}
                                                                        onClick={() => onDelete(claim)}
                                                                    >
                                                                        <TrashIcon /> Delete
                                                                    </button>

                                                                    <button
                                                                        style={{ ...btnBase, background: "#ECFDF5", color: "#059669" }}
                                                                        onClick={() => onSubmit(claim)}
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </>
                                                            )}

                                                            {claim.status === "REJECTED" && (
                                                                <button
                                                                    style={{ ...btnBase, background: "#EEF2FF", color: "#6366F1" }}
                                                                    onClick={() => onResubmit(claim)}
                                                                >
                                                                    Resubmit
                                                                </button>
                                                            )}
                                                        </>
                                                    )}

                                                    {isAdmin && claim.status === "SUBMITTED" && (
                                                        <>
                                                            <button
                                                                style={{ ...btnBase, background: "#ECFDF5", color: "#059669" }}
                                                                onClick={() => onApprove(claim)}
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                style={{ ...btnBase, background: "#FEF2F2", color: "#DC2626" }}
                                                                onClick={() => onReject(claim)}
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}