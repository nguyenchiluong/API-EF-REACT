import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/tasks";
import { Link } from "react-router-dom";

export default function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    const load = async () => {
    setLoading(true);
    const data = await getTasks(filter === "All" ? null : filter);
    setTasks(data);
    setLoading(false);
    };

    useEffect(() => { load(); }, [filter]);

    const handleDelete = async (id) => {
    if (confirm("Xóa task này?")) {
      await deleteTask(id); // bây giờ deleteTask return res.data
      await load(); // reload danh sách
    }
    };

    return (
    <div>
        <h2>Danh sách Task</h2>

        <label>Lọc theo trạng thái: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Todo</option>
        <option>Doing</option>
        <option>Done</option>
        </select>

        {loading ? <p>Đang tải...</p> : (
        <table border="1" cellPadding="6" style={{ marginTop: 16 }}>
            <thead>
            <tr>
                <th>ID</th><th>Title</th><th>Description</th><th>Due Date</th><th>Status</th><th>Action</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map(t => (
                <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{t.description || "-"}</td>
                <td>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}</td>
                <td>{t.status}</td>
                <td>
                    <Link to={`/tasks/${t.id}`}>Edit</Link>{" | "}
                    <button onClick={() => handleDelete(t.id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
    </div>
    );
}
