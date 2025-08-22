**Task Manager Backend API**

This is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing tasks, secured with **JWT authentication**.

-----

### **Technology Stack**

  * **Node.js + Express.js**: A fast and minimalist backend framework.
  * **MongoDB + Mongoose**: A flexible NoSQL database with robust schema validation.
  * **JWT (jsonwebtoken)**: For secure and stateless user authentication.
  * **bcryptjs**: Used for securely hashing user passwords.
  * **express-rate-limit & CORS**: Middleware to protect the API from abuse and handle cross-origin requests.
  * **dotenv**: Manages environment variables for configuration.

**Reason for Tech Choices**: This stack was chosen for its ability to enable rapid development and scalability. Using JavaScript across both the frontend and backend simplifies the development process. MongoDB's flexible schema is particularly well-suited for task-based applications.

-----

### **Setup and Local Run**

**1. Clone the repository and install dependencies:**

```bash
git clone <backend-repo-url>
cd task-manager-backend
npm install
```

**2. Configure environment variables:**
Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key
PORT=3000
JWT_EXPIRE=24h
NODE_ENV=development
```

**3. Run the server:**
Use the following commands to start the server in development or production mode:

```bash
# Development
npm run dev

# Production
npm start
```

Once running, you can check the server status by navigating to `http://localhost:3000/health`.

-----

### **Project Structure**

The project is organized as follows:

```
task-manager-backend/
├── config/        # Database connection logic
├── controllers/   # Business logic for authentication and tasks
├── middleware/    # Custom middleware (e.g., JWT validation, error handling)
├── models/        # Database schemas for User and Task
├── routes/        # API endpoints
└── server.js      # Main entry point of the application
```

-----

### **API Endpoints**

**Auth Routes:**

  * `POST /auth/signup`: Register a new user.
  * `POST /auth/login`: Log in a user and receive a JWT.

**Task Routes (Protected):**

  * `GET /tasks`: Retrieve all tasks for the authenticated user.
  * `POST /tasks`: Create a new task.
  * `PUT /tasks/:id`: Update an existing task.
  * `DELETE /tasks/:id`: Delete a task.

**Note**: All protected task routes require a **JWT** in the request header: `Authorization: Bearer <jwt_token>`.

-----

### **Development Insights**

**Time Spent:** Approximately 12 hours on the backend.

**Trade-offs Made:**

  * **Authentication:** JWT was chosen over more complex methods like OAuth2 or session management for its simplicity and efficiency.
  * **Features:** Core functionalities (user authentication and task CRUD) were prioritized. More advanced features such as due dates and reminders were intentionally deferred for future implementation.
  * **Testing:** Automated tests were not included to save time but the API's structure is designed to easily support integration with testing frameworks like Jest or Supertest later on.
  * **Database:** MongoDB was selected for its schema flexibility, but a relational database like SQL could be considered for future features requiring advanced reporting.