export default function StatusBadge({ status }) {
    const styles = {
        APPROVED:  { background: "#ECFDF5", color: "#059669" },
        REJECTED:  { background: "#FEF2F2", color: "#DC2626" },
        SUBMITTED: { background: "#FFFBEB", color: "#D97706" },
        DRAFT:     { background: "#F1F5F9", color: "#64748B" },
    };

    const s = styles[status] || styles.DRAFT;

    return (
        <span style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            background: s.background,
            color: s.color,
        }}>
            {status}
        </span>
    );
}