export default function EmployeeTable({ employees }) {
    return (
        <div className="card shadow-sm">

            <div className="card-header">
                <h5 className="mb-0">
                    Employees
                </h5>
            </div>

            <div className="card-body">

                <table className="table table-hover align-middle">

                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {employees.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center"
                                >
                                    No employees found.
                                </td>
                            </tr>
                        ) : (
                            employees.map((employee) => (
                                <tr key={employee.id}>

                                    <td>{employee.username}</td>

                                    <td>
                                        {employee.first_name}{" "}
                                        {employee.last_name}
                                    </td>

                                    <td>{employee.email}</td>

                                    <td>{employee.department}</td>

                                    <td>{employee.designation}</td>

                                    <td>
                                        {employee.status ? (
                                            <span className="badge bg-success">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger">
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td>

                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>

                                        <button
                                            className="btn btn-sm btn-danger"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

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