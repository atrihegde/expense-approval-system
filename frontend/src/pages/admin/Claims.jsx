import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import ClaimTable from "../../components/common/ClaimTable";
import {
    getClaims,
    approveClaim,
    rejectClaim,
} from "../../services/claimService";

function Claims() {

    const [claims, setClaims] = useState([]);

    const loadClaims = async () => {
        try {

            const data = await getClaims();

            setClaims(data.results ?? data);

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
        loadClaims();
    }, []);

    if (!claims) {
        return <Loader />;
    }

    return (
        <div>

            <h2 className="mb-4">
                All Expense Claims
            </h2>

            <ClaimTable
                claims={claims}
                onApprove={handleApprove}
                onReject={handleReject}
            />

        </div>
    );
}

export default Claims;