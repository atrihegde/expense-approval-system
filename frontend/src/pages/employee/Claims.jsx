import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "../../components/common/Loader";
import ClaimTable from "../../components/common/ClaimTable";
import ClaimModal from "../../components/common/ClaimModal";
import { getCategories } from "../../services/categoryService";

import {
    getClaims,
    createClaim,
    updateClaim,
    deleteClaim,
    submitClaim,
    resubmitClaim,
} from "../../services/claimService";

function Claims() {

    const [claims, setClaims] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const loadClaims = async () => {
        try {
            const data = await getClaims({
                search,
                status,
                category,
            });
            setClaims(data.results ?? data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            console.log(data);   // <-- temporary

            setCategories(data.results ?? data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSave = async (claimData) => {
        try {
            if (selectedClaim) {
                await updateClaim(
                    selectedClaim.id,
                    claimData
                );
                toast.success("Claim updated successfully!");
            } else {
                await createClaim(claimData);
                toast.success("Claim created successfully!");
            }
            setShowModal(false);
            setSelectedClaim(null);
            await loadClaims();
        } catch (error) {
            console.error(error.response?.data);
            const errors = error.response?.data;
            if (errors) {
                Object.entries(errors).forEach(([field, value]) => {
                    const message = Array.isArray(value)
                        ? value.join(", ")
                        : value;
                    toast.error(`${field}: ${message}`);
                });
            } else {
                toast.error("Something went wrong.");
            }
        }
    };

    const handleEdit = (claim) => {
        setSelectedClaim(claim);
        setShowModal(true);
    };


    const handleDelete = async (claim) => {
        const confirmed = window.confirm(
            `Delete "${claim.title}"?`
        );
        if (!confirmed) return;
        try {
            await deleteClaim(claim.id);
            toast.success("Claim deleted successfully!");
            await loadClaims();
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Unable to delete claim.");
        }
    };


    const handleSubmitClaim = async (claim) => {
        try {
            await submitClaim(claim.id);
            toast.success("Claim submitted successfully!");
            await loadClaims();
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Unable to submit claim.");
        }
    };

    const handleResubmit = async (claim) => {
        try {
            await resubmitClaim(claim.id);
            toast.success("Claim resubmitted successfully!");
            await loadClaims();
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Unable to resubmit claim.");
        }
    };


    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadClaims();
    }, [search, status, category]);

    if (!claims) {
        return <Loader />;
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Expense Claims</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedClaim(null);
                        setShowModal(true);
                    }}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    New Claim
                </button>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <input
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="DRAFT">
                            Draft
                        </option>

                        <option value="SUBMITTED">
                            Submitted
                        </option>

                        <option value="APPROVED">
                            Approved
                        </option>

                        <option value="REJECTED">
                            Rejected
                        </option>
                    </select>
                </div>
                <div className="col-md-4">
                <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>

                    {categories.map((cat) => (
                        <option
                            key={cat.id}
                            value={cat.id}
                        >
                            {cat.name}
                        </option>
                    ))}
                </select>
                </div>
            </div>

            <ClaimTable
                mode="employee"
                title="My Claims"
                claims={claims}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSubmit={handleSubmitClaim}
                onResubmit={handleResubmit}
            />
            
            <ClaimModal
                show={showModal}
                claim={selectedClaim}
                onClose={() => {
                    setShowModal(false);
                    setSelectedClaim(null);
                }}
                onSave={handleSave}
            />
        </div>
    );
}

export default Claims;