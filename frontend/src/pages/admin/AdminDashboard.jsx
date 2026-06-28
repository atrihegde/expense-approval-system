import { useEffect, useState } from "react";

import Loader from "../../components/common/Loader";
import ClaimTable from "../../components/common/ClaimTable";
import { getDashboard } from "../../services/dashboardService";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (!dashboard) {
        return <Loader />;
    }

    return (
        <div>

            <h2 className="mb-4">
                Admin Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card shadow-sm border-primary">
                        <div className="card-body text-center">
                            <i className="bi bi-people fs-1 text-primary"></i>
                            <h6 className="mt-2">Employees</h6>
                            <h2>{dashboard.total_employees}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-success">
                        <div className="card-body text-center">
                            <i className="bi bi-tags fs-1 text-success"></i>
                            <h6 className="mt-2">Categories</h6>
                            <h2>{dashboard.total_categories}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-dark">
                        <div className="card-body text-center">
                            <i className="bi bi-receipt fs-1 text-dark"></i>
                            <h6 className="mt-2">Total Claims</h6>
                            <h2>{dashboard.total_claims}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-warning">
                        <div className="card-body text-center">
                            <i className="bi bi-hourglass-split fs-1 text-warning"></i>
                            <h6 className="mt-2">Pending</h6>
                            <h2>{dashboard.pending_claims}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-success">
                        <div className="card-body text-center">
                            <i className="bi bi-check-circle fs-1 text-success"></i>
                            <h6 className="mt-2">Approved</h6>
                            <h2>{dashboard.approved_claims}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-danger">
                        <div className="card-body text-center">
                            <i className="bi bi-x-circle fs-1 text-danger"></i>
                            <h6 className="mt-2">Rejected</h6>
                            <h2>{dashboard.rejected_claims}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-5">

                <h4 className="mb-3">
                    Recent Claims
                </h4>

                <ClaimTable
                    mode="admin-dashboard"
                    title={null}
                    claims={dashboard.recent_claims}
                />

            </div>

        </div>
    );
}

export default AdminDashboard;