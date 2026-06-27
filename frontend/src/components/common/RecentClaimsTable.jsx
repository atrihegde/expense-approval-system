import StatusBadge from "./StatusBadge";

export default function RecentClaimsTable({ claims }) {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header">
        <h5 className="mb-0">Recent Claims</h5>
      </div>

      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Employee</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {claims.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No claims found.
                </td>
              </tr>
            ) : (
              claims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.title}</td>
                  <td>{claim.employee}</td>
                  <td>{claim.category_name}</td>
                  <td>₹{claim.amount}</td>
                  <td>
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