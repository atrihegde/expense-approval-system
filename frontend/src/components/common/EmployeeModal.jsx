import { useEffect, useState } from "react";

export default function EmployeeModal({
    show,
    employee,
    onClose,
    onSave,
}) 
    
{

    const emptyForm = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        department: "",
        designation: "",
    };

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (employee) {
            setFormData({
                ...employee,
                password: "",
            });
        } else {
            setFormData(emptyForm);
        }
    }, [employee]);
    

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
                        <h5>
                            {employee ? "Edit Employee" : "Add Employee"}
                        </h5>

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
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        disabled={!!employee}
                                        onChange={handleChange}
                                    />
                                </div>

                                {!employee && (
                                    <div className="col-md-6 mb-3">
                                        <input
                                            className="form-control"
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="First Name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Last Name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <input
                                        className="form-control"
                                        placeholder="Designation"
                                        name="designation"
                                        value={formData.designation}
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
                                {employee ? "Update" : "Save"}
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}