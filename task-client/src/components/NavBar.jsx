import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
    const { pathname } = useLocation();

    const style = (to) => ({
    padding: "8px 12px",
    borderRadius: 8,
    marginRight: 8,
    background: pathname.startsWith(to) ? "#2563eb" : "#e5e7eb",
    color: pathname.startsWith(to) ? "white" : "black",
    textDecoration: "none",
    });

    return (
    <nav style={{ marginBottom: 20 }}>
    <h3>Task Manager</h3>
    <Link to="/tasks" style={style("/tasks")}>Tasks</Link>
    <Link to="/tasks/new" style={style("/tasks/new")}>New Task</Link>
    </nav>
    );
}
