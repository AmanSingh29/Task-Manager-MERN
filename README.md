# Task Manager MERN App

## Project Overview
This is a Task Manager application where users can login/signup, create, edit, and delete tasks. Admin users can view all tasks and manage them. The application supports role-based access, search functionality, and pagination.

---

## Features
- User authentication (Login/Signup)
- Create Task
- Edit Task
- Delete Task
- Search functionality
- Pagination
- Role-based authentication (Admin can view all tasks)

---

## Deployed On
[Task Manager App](https://task-manager-mern-bay.vercel.app/)

---

## Admin Credentials
```env
Email: admin@gmail.com
Password: 123456
```

---

## Technologies Used
**Backend:** Node.js, Express.js, MongoDB, JWT  
**Frontend:** React.js, Context API, Axios, Tailwind CSS  
**Database:** MongoDB

---

## Installation & Setup

### Backend Setup
1. Open the project in VS Code.
2. Go to the `BE` folder and create a `.env` file with the following content:

```env
PORT=7070
MONGODB_URI=mongodb://localhost:27017/task-manager # Use local MongoDB or your cloud MongoDB URL
NODE_ENV=dev
JWT_SECRET=<your-secret-key>
```

3. Install dependencies:

```bash
npm i -f
```

4. Start the server:

```bash
npm run dev
```

5. When the server starts, go to the ports section in the VS Code terminal, forward the port on which the process is running, make it public, and copy the endpoint. This will be used in the frontend.

### Frontend Setup
1. Go to the `FE` folder and create a `.env` file with the following content:

```env
VITE_API_URL=<your-backend-endpoint>
```

2. Install dependencies:

```bash
npm i -f
```

3. Start the frontend:

```bash
npm run dev
```

4. Open the provided local URL in your browser to access the app.

---

## Notes
- Ensure MongoDB is running locally or use a cloud MongoDB URL.
- Use a strong JWT_SECRET in production.
- Make sure the frontend points to the correct backend API endpoint.
