import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";
import StatCard from "../../components/common/StatCard";
import RecentClaimsTable from "../../components/common/RecentClaimsTable";
import Loader from "../../components/common/Loader";

export default function AdminDashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!dashboard) {
        return <Loader />;
    }

    return (
        <>
            <h2 className="mb-4">Admin Dashboard</h2>

            <div className="row">

                <StatCard
                    title="Employees"
                    value={dashboard.total_employees}
                    icon="bi-people-fill"
                    color="primary"
                />

                <StatCard
                    title="Categories"
                    value={dashboard.total_categories}
                    icon="bi-tags-fill"
                    color="success"
                />

                <StatCard
                    title="Claims"
                    value={dashboard.total_claims}
                    icon="bi-receipt"
                    color="warning"
                />

                <StatCard
                    title="Pending"
                    value={dashboard.pending_claims}
                    icon="bi-hourglass-split"
                    color="danger"
                />

            </div>

            <div className="card shadow-sm mt-4">
            <div className="card-header">
                <h5>Recent Claims</h5>
            </div>

            <div className="card-body">

                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Employee</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {dashboard.recent_claims.map((claim) => (

                            <tr key={claim.id}>
                                <td>{claim.title}</td>
                                <td>{claim.employee}</td>
                                <td>₹{claim.amount}</td>
                                <td>{claim.status}</td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            <RecentClaimsTable
                claims={dashboard.recent_claims}
            />
        </div>
        </>
    );
}