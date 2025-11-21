namespace TaskApi.Models;
public enum TaskStatus { Todo = 0, Doing = 1, Done = 2 }

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime DueDate { get; set; } = default!;
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
