
---

# Bài tập Web API – React
# 21127643 - Nguyễn Chí Lương
## 1. Cấu hình Database

### Tạo container MySQL bằng Docker

```bash
docker run -d --name mysql-task -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=taskdb -p 3306:3306 -v mysql_data:/var/lib/mysql mysql:8.0
```

### Kiểm tra container

```bash
docker ps
```

### Khởi động lại MySQL nếu container đã tồn tại

```bash
docker start mysql-task
```

### Kết nối vào MySQL để kiểm tra

```bash
docker exec -it mysql-task mysql -u root -p
```

Nhập mật khẩu:

```
123456
```

### Trong MySQL Shell chạy thử:

```sql
SHOW DATABASES;
USE taskdb;
```

---

## 2. Sửa nội dung file `TaskApi/appsettings.json`

```json
{
  "ConnectionStrings": {
    "Default": "server=localhost;port=3306;database=taskdb;user=root;password=123456"
  },
  "Logging": {
    "LogLevel": { 
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning" 
    }
  },
  "AllowedHosts": "*"
}
```

---

## 3. Tạo file `task-client/.env.local`

```
VITE_API_BASE_URL=http://localhost:5217/api/
```

---

## 4. Sửa nội dung file `task-client/vite.config.js`

> Port frontend được cấu hình là **5173**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
})
```

---

