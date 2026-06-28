import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function ClaimTable({
    claims,
    onEdit,
    onDelete,
    onSubmit,
    onApprove,
    onReject,
}) {
    const { user } = useContext(AuthContext);


    return (
        <div className="card shadow-sm">

            <div className="card-header">
                <h5 className="mb-0">
                    My Claims
                </h5>
            </div>

            <div className="card-body">

                <table className="table table-hover">

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {claims.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center"
                                >
                                    No claims found.
                                </td>
                            </tr>
                        ) : (

                            claims.map((claim) => (
                                <tr key={claim.id}>
                                    <td>{claim.title}</td>
                                    <td>{claim.category_name}</td>
                                    <td>₹ {claim.amount}</td>
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

                                    <td>
                                        {user?.role === "EMPLOYEE" &&
                                            claim.status === "DRAFT" && (
                                                <>
                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => onEdit(claim)}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>

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

                                        {user?.role === "ADMIN" &&
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

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}