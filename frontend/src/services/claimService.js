import api from "../api/axios";

export const getClaims = async (params = {}) => {
    const response = await api.get("claims/", {
        params,
    });

    return response.data;
};

export const createClaim = async (data) => {
    const response = await api.post(
        "claims/",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const updateClaim = async (id, data) => {
    const response = await api.put(
        `claims/${id}/`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const deleteClaim = async (id) => {
    const response = await api.delete(`claims/${id}/`);
    return response.data;
};

export const submitClaim = async (id) => {
    const response = await api.post(
        `claims/${id}/submit/`
    );

    return response.data;
};

export const resubmitClaim = async (id) => {
    const response = await api.post(`claims/${id}/resubmit/`);
    return response.data;
};

export const approveClaim = async (id, comments = "") => {
    const response = await api.post(
        `claims/${id}/approve/`,
        {
            manager_comments: comments,
        }
    );

    return response.data;
};

export const rejectClaim = async (id, comments) => {
    const response = await api.post(
        `claims/${id}/reject/`,
        {
            manager_comments: comments,
        }
    );

    return response.data;
};