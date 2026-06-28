export default function CategoryTable({
    categories,
    onEdit,
    onDelete,
}) {
    return (
        <div className="card shadow-sm">

            <div className="card-header">
                <h5 className="mb-0">
                    Categories
                </h5>
            </div>

            <div className="card-body">

                <table className="table table-hover">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {categories.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center"
                                >
                                    No categories found.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id}>

                                    <td>{category.name}</td>

                                    <td>
                                        {category.status ? (
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
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => onEdit(category)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(category)}
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