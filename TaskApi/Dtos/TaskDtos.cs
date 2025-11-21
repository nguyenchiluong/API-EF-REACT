namespace TaskApi.Dtos;

public record TaskDto(
    int Id,
    string Title,
    string Description = default!,
    DateTime DueDate = default!,
    string Status = default!,
    DateTime CreatedAt = default!
);

public class CreateTaskDto
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime DueDate { get; set; } = default!;
}

public class UpdateTaskDto
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime DueDate { get; set; } = default!;
    public string Status { get; set; } = default!;
}
