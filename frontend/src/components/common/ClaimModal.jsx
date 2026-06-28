import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

export default function ClaimModal({
    show,
    claim,
    onClose,
    onSave,
}) {

    const emptyForm = {
        title: "",
        category: "",
        amount: "",
        expense_date: "",
        description: "",
        receipt: null,
    };

    const [formData, setFormData] = useState(emptyForm);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (claim) {
            setFormData({
                ...claim,
                receipt: null,
            });
        } else {
            setFormData(emptyForm);
        }
    }, [claim]);


useEffect(() => {

    if (show) {
        loadCategories();
    }

}, [show]);


const loadCategories = async () => {
    try {
        const data = await getCategories();

        console.log("Categories API:", data);

        setCategories(data.results ?? data);
    } catch (error) {
        console.error(error.response?.data || error);
    }
};



    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {

            if (formData[key] !== null && formData[key] !== "") {

                data.append(key, formData[key]);

            }

        });

        onSave(data);

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
                            {claim ? "Edit Claim" : "New Claim"}
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
                                    <label className="form-label">Title</label>
                                    <input
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Category</option>

                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Amount</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        step="0.01"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Expense Date
                                    </label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="expense_date"
                                        value={formData.expense_date}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">
                                        Receipt
                                    </label>

                                    <input
                                        className="form-control"
                                        type="file"
                                        name="receipt"
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
                                className="btn btn-primary"
                                type="submit"
                            >
                                {claim ? "Update" : "Save"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}