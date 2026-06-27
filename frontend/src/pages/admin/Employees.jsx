import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import EmployeeTable from "../../components/common/EmployeeTable";
import Loader from "../../components/common/Loader";
import EmployeeModal from "../../components/common/EmployeeModal";
import {
    // getEmployees,
    createEmployee,
} from "../../services/employeeService";


function Employees() {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, [search]);

    const loadEmployees = async () => {
        try {
            const data = await getEmployees(search);
            setEmployees(data.results ?? data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (employeeData) => {
        try {
            await createEmployee(employeeData);

            setShowModal(false);

            loadEmployees();

            alert("Employee created successfully.");

        } catch (error) {
    const errors = error.response?.data;

    if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
            alert(`${field}: ${messages.join(", ")}`);
        });
    } else {
        alert("Something went wrong.");
    }
}
    };

    if (!employees) {
        return <Loader />;
    }

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Employee Management</h2>

            </div>

            <div className="row mb-4">

                <div className="col-md-6">

                    <input
                        className="form-control"
                        placeholder="Search employee..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="col-md-6 text-end">

                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i>

                        Add Employee
                    </button>

                </div>

            </div>

            <EmployeeTable employees={employees} />

            <EmployeeModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
            />

        </div>
    );
}


export default Employees;