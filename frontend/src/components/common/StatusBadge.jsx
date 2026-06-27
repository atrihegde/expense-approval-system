export default function StatusBadge({ status }) {
  const badgeClasses = {
    APPROVED: "bg-success",
    REJECTED: "bg-danger",
    SUBMITTED: "bg-warning text-dark",
    DRAFT: "bg-secondary",
  };

  return (
    <span className={`badge ${badgeClasses[status] || "bg-secondary"}`}>
      {status}
    </span>
  );
}