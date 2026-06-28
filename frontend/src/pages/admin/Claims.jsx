import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import ClaimTable from "../../components/common/ClaimTable";
import { toast } from "react-toastify";

import { getCategories } from "../../services/categoryService";

import {
    getClaims,
    approveClaim,
    rejectClaim,
} from "../../services/claimService";

function Claims() {

    const [claims, setClaims] = useState([]);
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
            setCategories(data.results ?? data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleApprove = async (claim) => {
        try {
            await approveClaim(claim.id);
            toast.success("Claim approved successfully!");
            await loadClaims();
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Unable to approve claim.");
        }
    };


    const handleReject = async (claim) => {
        const comments = prompt(
            "Enter rejection reason:"
        );
        if (comments === null) return;
        try {
            await rejectClaim(
                claim.id,
                comments
            );
            toast.success("Claim rejected successfully!");
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
            }
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

            <h2 className="mb-4">
                All Expense Claims
            </h2>

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
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >
                        <option value="">
                            All Categories
                        </option>
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
                mode="admin"
                title="All Claims"
                claims={claims}
                onApprove={handleApprove}
                onReject={handleReject}
            />

        </div>
    );
}

export default Claims;