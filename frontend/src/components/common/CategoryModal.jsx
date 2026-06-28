import { useEffect, useState } from "react";

export default function CategoryModal({
    show,
    category,
    onClose,
    onSave,
}) {

    const emptyForm = {
        name: "",
        max_amount: "",
        description: "",
    };

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (category) {
            setFormData(category);
        } else {
            setFormData(emptyForm);
        }
    }, [category]);


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
            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>
                            {category
                                ? "Edit Category"
                                : "Add Category"}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label">
                                    Category Name
                                </label>

                                <input
                                    className="form-control"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Maximum Amount
                                </label>

                                <input
                                    className="form-control"
                                    type="number"
                                    step="0.01"
                                    name="max_amount"
                                    value={formData.max_amount || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="description"
                                    value={formData.description || ""}
                                    onChange={handleChange}
                                />
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
                                {category
                                    ? "Update"
                                    : "Save"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}