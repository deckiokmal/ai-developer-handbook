1. gunakan QuartSchema untuk validasi Request dan Response JSON
    QuartSchema juga otomatis menyediakan swagger endpoint /openapi.json dan /docs

contoh bagaimana membuat schema:
```python
@dataclass
class TodoIn:
    task: str
    due: datetime | None

@dataclass
class Todo(TodoIn):
    id: int

@app.post("/todos/")
@validate_request(TodoIn)
@validate_response(Todo)
async def create_todo(data: TodoIn) -> Todo:
    return Todo(id=1, task=data.task, due=data.due)
```
