Personal Task Manager — Web API + React


1. Setup Database (MySQL via Docker)

Open Terminal and run:

docker run -d \
  --name mysql-task \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e MYSQL_DATABASE=taskdb \
  -p 3306:3306 \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0


Check running containers:

docker ps


Start MySQL container:

docker start mysql-task


Open MySQL shell:

docker exec -it mysql-task mysql -u root -p


Password: 123456

Inside MySQL:

SHOW DATABASES;
USE taskdb;

2. Configure ASP.NET Core API

File: TaskApi/appsettings.json

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


Run API:

dotnet run


API base URL:

http://localhost:5217/api/

3. Configure React Frontend (Vite)

File: task-client/.env.local

VITE_API_BASE_URL=http://localhost:5217/api/


File: task-client/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
})
