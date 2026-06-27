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

export const updateEmployee = async (id, data) => {
    const response = await api.put(
        `auth/employees/${id}/`,
        data
    );

    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(
        `auth/employees/${id}/`
    );

    return response.data;
};