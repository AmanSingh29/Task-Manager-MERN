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
VITE_API_URL=<your-backend-endpoint> # Use The copied endpoint from the forwarding port.
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

## Creating an Admin User

1. First, create a normal user account through the Signup page.
2. Open your MongoDB database (local or cloud) and find the newly created user in the `users` collection.
3. Change the user's role from `user` to `admin` by updating the `role` field:

```json
{
  "role": "admin"
}
```

4. Save the changes in the database.
5. Login with that user’s credentials again. Now the user will have admin access and can view/manage all tasks in the dashboard.

## Backend Testing with Jest

This project includes a simple test case for the **User model** using **Jest** and **in-memory MongoDB**.

### What This Test Does

* **Test 1:** `should create & save user successfully`
  Verifies that a new user can be created and saved in the database with all required fields (`name`, `email`, `password`).

* **Test 2:** `should fail to create User without email`
  Ensures that the database throws a validation error if a user is created without an `email` field, which is required.

The tests use **MongoMemoryServer**, which is an in-memory MongoDB instance. This allows tests to run without affecting your real database.

### How to Run the Tests

1. Install dev dependencies (if not already installed):

```bash
npm install --save-dev jest mongodb-memory-server
```

2. Make sure your backend dependencies are installed:

```bash
npm i -f
```

3. Run the tests:

```bash
npm test
```

You should see output similar to:

```
PASS  src/tests/user.test.js
  User Model Test
    ✓ should create & save user successfully
    ✓ should fail to create User without email
```

### Notes

* These tests do **not** affect your real MongoDB data; they run on an in-memory database.
* You can add more tests for other models and API routes using the same approach.


---

## Notes
- Ensure MongoDB is running locally or use a cloud MongoDB URL.
