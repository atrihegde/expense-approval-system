import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import EmployeeTable from "../../components/common/EmployeeTable";
import Loader from "../../components/common/Loader";
import EmployeeModal from "../../components/common/EmployeeModal";
import { toast } from "react-toastify";
import {
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../../services/employeeService";


function Employees() {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);


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
            if (selectedEmployee) {
                const updateData = {
                    first_name: employeeData.first_name,
                    last_name: employeeData.last_name,
                    email: employeeData.email,
                    department: employeeData.department,
                    designation: employeeData.designation,
                    status: selectedEmployee.status,
                };

                await updateEmployee(
                    selectedEmployee.id,
                    updateData
                );
                toast.success("Employee updated successfully!");
            } else {
                await createEmployee(employeeData);
                toast.success("Employee created successfully!");
            }

            setShowModal(false);
            setSelectedEmployee(null);
            loadEmployees();
        } 
        catch (error) {
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
    

    const handleDelete = async (employee) => {

        const confirmed = window.confirm(
            `Delete ${employee.first_name} ${employee.last_name}?`
        );

        if (!confirmed) return;

        try {

            await deleteEmployee(employee.id);

            toast.success("Employee deleted successfully!");

            loadEmployees();

        } catch (error) {

            console.error(error.response?.data);

            toast.error("Unable to delete employee.");

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
                        onClick={() => {
                            setSelectedEmployee(null);
                            setShowModal(true);
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>

                        Add Employee
                    </button>

                </div>

            </div>

            <EmployeeTable
                employees={employees}
                onEdit={(employee) => {
                    setSelectedEmployee(employee);
                    setShowModal(true);
                }}
                onDelete={handleDelete}
            />

            <EmployeeModal
                show={showModal}
                employee={selectedEmployee}
                onClose={() => {
                    setShowModal(false);
                    setSelectedEmployee(null);
                }}
                onSave={handleSave}
            />
        </div>
    );
}


export default Employees;