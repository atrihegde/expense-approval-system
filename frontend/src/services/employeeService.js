import api from "../api/axios";

export const getEmployees = async () => {
    const response = await api.get("auth/employees/");
    return response.data;
};