import api from "../api/axios";

export const getEmployees = async (search = "") => {
    const response = await api.get("auth/employees/", {
        params: {
            search,
        },
    });

    return response.data;
};

export const createEmployee = async (data) => {
    const response = await api.post(
        "auth/employees/",
        data
    );

    return response.data;
};