import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTask, createTask, updateTask } from "../api/tasks";

export default function TaskForm() {
    const { id } = useParams();
    const isEdit = !!id;
    const nav = useNavigate();

    const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Todo"
    });

    useEffect(() => {
    if (isEdit) getTask(id).then(t => {
        setTask({
        title: t.title,
        description: t.description || "",
        dueDate: t.dueDate ? t.dueDate.slice(0,10) : "",
        status: t.status
        });
    });
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) await updateTask(id, task); 
    else await createTask(task); 
    nav("/tasks");
    };

    return (
    <form onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit Task" : "New Task"}</h2>

        <label>Title</label>
        <input value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} required />

        <label>Description</label>
        <input value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />

        <label>Due Date</label>
        <input type="date" value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />

        {isEdit && (
        <>
            <label>Status</label>
            <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
            <option>Todo</option>
            <option>Doing</option>
            <option>Done</option>
            </select>
        </>
        )}

        <button type="submit">Save</button>
    </form>
    );
}
