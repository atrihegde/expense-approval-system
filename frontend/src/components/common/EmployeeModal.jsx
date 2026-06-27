import { useState } from "react";

export default function EmployeeModal({
    show,
    onClose,
    onSave,
}) {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        department: "",
        designation: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!show) return null;

    return (
        <div
            className="modal d-block"
            style={{ background: "rgba(0,0,0,.5)" }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5>Add Employee</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Username"
                                        name="username"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="First Name"
                                        name="first_name"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Last Name"
                                        name="last_name"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Department"
                                        name="department"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <input
                                        className="form-control"
                                        placeholder="Designation"
                                        name="designation"
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}