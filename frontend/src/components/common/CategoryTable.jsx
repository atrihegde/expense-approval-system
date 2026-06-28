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
    transition: "opacity 0.15s",
};

export default function CategoryTable({ categories, onEdit, onDelete }) {

    const thStyle = {
        padding: "11px 16px",
        fontSize: "11px",
        fontWeight: 600,
        color: "#64748B",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        background: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
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
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E8F0" }}>
                <h5 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#0F172A" }}>
                    Categories
                </h5>
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="3" style={{ ...tdStyle, textAlign: "center", color: "#94A3B8", padding: "40px 16px" }}>
                                    No categories found.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id}
                                    onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                >
                                    <td style={{ ...tdStyle, fontWeight: 500, color: "#0F172A" }}>
                                        {category.name}
                                    </td>
                                    <td style={tdStyle}>
                                        {category.status ? (
                                            <span style={{
                                                display: "inline-block", padding: "3px 10px",
                                                borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                                                background: "#ECFDF5", color: "#059669",
                                            }}>Active</span>
                                        ) : (
                                            <span style={{
                                                display: "inline-block", padding: "3px 10px",
                                                borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                                                background: "#FEF2F2", color: "#DC2626",
                                            }}>Inactive</span>
                                        )}
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: "flex", gap: "6px" }}>
                                            <button
                                                style={{ ...btnBase, background: "#FFFBEB", color: "#D97706" }}
                                                onClick={() => onEdit(category)}
                                            >
                                                <EditIcon /> Edit
                                            </button>
                                            <button
                                                style={{ ...btnBase, background: "#FEF2F2", color: "#DC2626" }}
                                                onClick={() => onDelete(category)}
                                            >
                                                <TrashIcon /> Delete
                                            </button>
                                        </div>
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