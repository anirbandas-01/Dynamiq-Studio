# 🚀 Dynamic App Generator

A powerful full-stack application that enables users to create and manage dynamic, configuration-driven applications at runtime. Build forms, tables, and data management systems without writing code.

---

## 🌟 Features

- 🔧 **Runtime Configuration** – Create applications dynamically using JSON-based field configurations
- 📝 **Dynamic Forms** – Auto-generated forms based on your configuration
- 📊 **Dynamic Tables** – Automatic table rendering with configured fields
- 📤 **CSV Import** – Bulk data upload with field validation
- 🔐 **Authentication** – Secure user registration and login using JWT
- 🎨 **Modern UI** – Clean and responsive interface built with Tailwind CSS
- ⚡ **Real-time Updates** – Instant feedback and data synchronization

---

# 🖼️ Screenshots

## Dashboard
Beautiful overview of all your dynamic applications with statistics.

![Dashboard](./screenshots/dashboard.png)

---

## App Creator
Intuitive interface to configure fields and generate applications.

![App Creator](./screenshots/app-creator.png)

---

## Dynamic Application
Runtime-generated forms, tables, and CSV import functionality.

![Dynamic Application](./screenshots/dynamic-app.png)

---

# 🏗️ Architecture

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Axios
- PapaParse
- Vite

### Backend
- Node.js
- Express.js
- Supabase (PostgreSQL)
- JWT Authentication
- bcryptjs
- CORS

---

# 📋 Prerequisites

Before running this project, make sure you have:

- Node.js >= 20
- npm or yarn
- Supabase account and project

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/dynamic-app-generator.git

cd dynamic-app-generator
```

---

# ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=8000

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

JWT_SECRET=your_jwt_secret_key
```

---

# 🗄️ Database Setup

Create the following tables in your Supabase project.

## users table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## apps table

```sql
CREATE TABLE apps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  config JSONB NOT NULL,
  csv_uploads INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## app_data table

```sql
CREATE TABLE app_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id TEXT REFERENCES apps(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 🎨 Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

---

# ▶️ Run the Application

## Terminal 1 — Backend

```bash
cd backend
npm run dev
```

## Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Application will run at:

```bash
http://localhost:5173
```

---

# 📖 Usage

## 🧩 Creating a Dynamic App

### 1. Register / Login
Create a new account or login to an existing account.

### 2. Create New App
Configure your fields dynamically:

- Add field name (Example: Name, Email, Age)
- Select field type:
  - Text
  - Number
  - Email
  - Date
  - Password
- Add multiple fields as needed

### 3. Generate Application
Click **Generate Application** to create your dynamic application instantly.

---

# 📊 Managing Data

## ✍️ Manual Entry

- Use dynamic forms to add individual records
- Form fields are generated automatically

---

## 📤 CSV Import

- Upload CSV files with matching column headers
- Automatic validation before insertion
- Supports bulk record insertion

---

## 📑 View Records

- Dynamic table displays all records
- Columns automatically match configuration fields

---

# 🔑 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |

---

## Apps

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/apps` | Create new app |
| GET | `/apps` | Get all user apps |
| GET | `/apps/:id` | Get specific app |
| DELETE | `/apps/:id` | Delete app |

---

## Data

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/data/:appId` | Add single record |
| GET | `/data/:appId` | Get all records |
| POST | `/data/bulk/:appId` | Bulk CSV import |

---

# 📁 Project Structure

```bash
dynamic-app-generator/
│
├── backend/
│   ├── controller/
│   │   ├── appController.js
│   │   ├── authController.js
│   │   └── dataController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── appRoutes.js
│   │   ├── authRoutes.js
│   │   └── dataRoutes.js
│   │
│   ├── utils/
│   │   └── validateFields.js
│   │
│   ├── db.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CSVUpload.jsx
│   │   │   ├── DynamicForm.jsx
│   │   │   ├── DynamicTable.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── CreateApp.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DynamicApp.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

# 🔒 Security Features

- JWT-based Authentication
- Password Hashing with bcryptjs
- Protected Frontend Routes
- Server-side Validation
- SQL Injection Prevention via Supabase
- Secure CORS Configuration

---

# 🤝 Contributing

Contributions are welcome!

### Steps to Contribute

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/AmazingFeature

# Commit changes
git commit -m "Add AmazingFeature"

# Push to GitHub
git push origin feature/AmazingFeature
```

Then open a Pull Request 🚀

---

# 📝 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Anirban Das

- GitHub: [@anirbandas-01](https://github.com/anirbandas-01)

---

# 🙏 Acknowledgments

Special thanks to:

- React Team
- Supabase
- Tailwind CSS
- All contributors and supporters

---

# 📮 Support

If you found this project useful, feel free to ⭐ the repository.

For support or suggestions, open an issue in the repository.

---

<div align="center">

Made with ❤️ by **Anirban Das**

</div>
