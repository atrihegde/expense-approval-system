
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

    const isEmployeeDashboard =
        mode === "employee-dashboard";

    const isAdminDashboard =
        mode === "admin-dashboard";

    const showEmployee =
        isAdmin || isAdminDashboard;

    const showReceipt =
        isEmployee || isAdmin;

    const showComments =
        isEmployee || isAdmin;

    const showActions =
        isEmployee || isAdmin;

    const totalColumns =
        5 +
        (showEmployee ? 1 : 0) +
        (showReceipt ? 1 : 0) +
        (showComments ? 1 : 0) +
        (showActions ? 1 : 0);

    return (
        <div className="card shadow-sm">

            <div className="card-header">
                {title && (
                    <div className="card-header">
                        <h5 className="mb-0">
                            {title}
                        </h5>
                    </div>
                )}
            </div>

            <div className="card-body">

                <table className="table table-hover">

                    <thead>
                        <tr>
                            {showEmployee && <th>Employee</th>}
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            {showReceipt && <th>Receipt</th>}
                            <th>Date</th>
                            <th>Status</th>
                            {showComments && <th>Comments</th>}
                            {showActions && <th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>

                        {claims.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={totalColumns}
                                    className="text-center"
                                >
                                    No claims found.
                                </td>
                            </tr>
                        ) : (

                            claims.map((claim) => (
                                <tr key={claim.id}>

                                    {showEmployee && (
                                        <td>{claim.employee}</td>
                                    )}

                                    <td>{claim.title}</td>

                                    <td>{claim.category_name}</td>

                                    <td>₹ {claim.amount}</td>

                                    {showReceipt && (
                                        <td>
                                            {claim.receipt_url ? (
                                                <a
                                                    href={claim.receipt_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-primary btn-sm"
                                                >
                                                    <i className="bi bi-file-earmark-text me-1"></i>
                                                    View
                                                </a>
                                            ) : (
                                                <span className="text-muted">
                                                    No Receipt
                                                </span>
                                            )}
                                        </td>
                                    )}

                                    <td>{claim.expense_date}</td>

                                    <td>
                                        <span
                                            className={`badge ${
                                                claim.status === "APPROVED"
                                                    ? "bg-success"
                                                    : claim.status === "REJECTED"
                                                    ? "bg-danger"
                                                    : claim.status === "SUBMITTED"
                                                    ? "bg-warning text-dark"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {claim.status}
                                        </span>
                                    </td>

                                    {showComments && (
                                        <td>
                                            {claim.manager_comments ? (
                                                <span>{claim.manager_comments}</span>
                                            ) : (
                                                <span className="text-muted">—</span>
                                            )}
                                        </td>
                                    )}

                                    {showActions && (
                                        <td>
                                            {isEmployee && (
                                                <>
                                                    {(claim.status === "DRAFT" ||
                                                    claim.status === "REJECTED") && (
                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => onEdit(claim)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                    )}

                                                    {claim.status === "DRAFT" && (
                                                        <>
                                                            <button
                                                                className="btn btn-danger btn-sm me-2"
                                                                onClick={() => onDelete(claim)}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>

                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => onSubmit(claim)}
                                                            >
                                                                Submit
                                                            </button>
                                                        </>
                                                    )}

                                                    {claim.status === "REJECTED" && (
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => onResubmit(claim)}
                                                        >
                                                            Resubmit
                                                        </button>
                                                    )}
                                                </>
                                            )}

                                            {isAdmin &&
                                                claim.status === "SUBMITTED" && (
                                                <>
                                                    <button
                                                        className="btn btn-success btn-sm me-2"
                                                        onClick={() => onApprove(claim)}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => onReject(claim)}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                    </td>
                                )}

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}