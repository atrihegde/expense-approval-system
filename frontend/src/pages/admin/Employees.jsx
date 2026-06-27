import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";

function Employees() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data.results ?? data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>

            <h2 className="mb-4">
                Employee Management
            </h2>

            <pre>
                {JSON.stringify(employees, null, 2)}
            </pre>

        </div>
    );
}

export default Employees;