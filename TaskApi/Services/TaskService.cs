using TaskApi.Dtos;
using TaskApi.Models;
using TaskApi.Repositories;

namespace TaskApi.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;
    public TaskService(ITaskRepository repo) => _repo = repo;

    public async Task<IEnumerable<TaskDto>> GetAllAsync(string? status = null)
    {
        var list = await _repo.ListAsync(string.IsNullOrWhiteSpace(status) ? null : t => t.Status.ToString() == status);
        return list.Select(ToDto);
    }

    public async Task<TaskDto?> GetOneAsync(int id)
    {
        var t = await _repo.GetByIdAsync(id);
        return t is null ? null : ToDto(t);
    }

    public async Task<TaskDto> CreateAsync(CreateTaskDto input)
    {
        if (string.IsNullOrWhiteSpace(input.Title))
            throw new ArgumentException("Title is required");

        if (await _repo.ExistsByTitleAsync(input.Title.Trim()))
            throw new InvalidOperationException("Task with this title already exists");

        var entity = new TaskItem
        {
            Title = input.Title.Trim(),
            Description = input.Description,
            DueDate = input.DueDate,
            Status = TaskApi.Models.TaskStatus.Todo
        };

        await _repo.AddAsync(entity);
        await _repo.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, UpdateTaskDto input)
    {
        var exists = await _repo.GetByIdAsync(id);
        if (exists is null) return false;

        exists.Title = input.Title;
        exists.Description = input.Description;
        exists.DueDate = input.DueDate;
        if (!string.IsNullOrWhiteSpace(input.Status) && Enum.TryParse<TaskApi.Models.TaskStatus>(input.Status, true, out var s))
            exists.Status = s;

        _repo.Update(exists);
        await _repo.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var exists = await _repo.GetByIdAsync(id);
        if (exists is null) return false;

        _repo.Remove(exists);
        await _repo.SaveChangesAsync();
        return true;
    }

    private static TaskDto ToDto(TaskItem t) =>
        new TaskDto(t.Id, t.Title, t.Description, t.DueDate, t.Status.ToString(), t.CreatedAt);
}
