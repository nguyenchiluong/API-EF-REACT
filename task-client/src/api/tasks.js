import api from "./client";

export const getTasks = async (status) => {
    const url = status ? `/tasks?status=${status}` : "/tasks";
    const res = await api.get(url);
    return res.data;
};

export const getTask = async (id) => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
};

export const createTask = async (payload) => {
    const res = await api.post("/tasks", payload);
    return res.data;
};

export const updateTask = async (id, payload) => {
    const res = await api.put(`/tasks/${id}`, payload);
    return res.data;
};

export const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
};
