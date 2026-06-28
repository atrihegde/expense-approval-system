import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "../../components/common/Loader";
import ClaimTable from "../../components/common/ClaimTable";
import ClaimModal from "../../components/common/ClaimModal";

import {
    getClaims,
    createClaim,
    updateClaim,
    deleteClaim,
    submitClaim,
} from "../../services/claimService";

function Claims() {

    const [claims, setClaims] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState(null);

    const loadClaims = async () => {
        try {
            const data = await getClaims();
            setClaims(data.results ?? data);
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


    useEffect(() => {
        loadClaims();
    }, []);

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

            <ClaimTable
                claims={claims}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSubmit={handleSubmitClaim}
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