export default function StatCard({ title, value, icon, color }) {

    const colorMap = {
        primary:  { bg: "#EEF2FF", iconColor: "#6366F1", valueColor: "#0F172A" },
        success:  { bg: "#ECFDF5", iconColor: "#10B981", valueColor: "#0F172A" },
        danger:   { bg: "#FEF2F2", iconColor: "#EF4444", valueColor: "#0F172A" },
        warning:  { bg: "#FFFBEB", iconColor: "#F59E0B", valueColor: "#0F172A" },
        info:     { bg: "#ECFEFF", iconColor: "#06B6D4", valueColor: "#0F172A" },
        dark:     { bg: "#F1F5F9", iconColor: "#1E293B", valueColor: "#0F172A" },
        secondary:{ bg: "#F8FAFC", iconColor: "#64748B", valueColor: "#0F172A" },
    };

    const theme = colorMap[color] || colorMap.secondary;

    return (
        <div className="col-md-3 mb-4">
            <div style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                border: "1px solid #F1F5F9",
                fontFamily: "'Inter', sans-serif",
            }}>
                <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background: theme.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}>
                    <i className={`bi ${icon}`} style={{ fontSize: "1.4rem", color: theme.iconColor }}></i>
                </div>

                <div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#64748B", fontWeight: 500 }}>
                        {title}
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: "26px", fontWeight: 700, color: theme.valueColor, lineHeight: 1 }}>
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}