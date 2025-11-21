Bài tập Web API - React

Cấu hình database
Mở Terminal và chạy lệnh sau:
docker run -d --name mysql-task -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=taskdb -p 3306:3306 -v mysql_data:/var/lib/mysql mysql:8.0

Kiểm tra container
docker ps

Chạy MySQL dùng docker:
docker start mysql-task

Kết nối để kiểm tra MySQL
docker exec -it mysql-task mysql -u root -p
# nhập password: 123456

Trong MySQL shell, gõ thử:
SHOW DATABASES;
USE taskdb;


appsettings.json
{
  "ConnectionStrings": {
  "Default":
"server=localhost;port=3306;database=taskdb;user=root;password=123456"
  },
  "Logging": {
  "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning" }
  },
  "AllowedHosts": "*"
}

File task-client/.env.local
VITE_API_BASE_URL=http://localhost:5217/api/

File task-client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,   
    host: true,
  },
})




