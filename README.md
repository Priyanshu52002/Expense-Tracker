# Expense Tracker

A full-stack Expense Tracker application that allows users to track and visualize their expenses. This application demonstrates the integration of a frontend built with React, a backend developed using Node.js and Express.js, and a MongoDB database.

## Features

- Add, edit, and delete expense records.
- Visualize expenses with:
  - Pie chart for category distribution.
  - Bar chart for monthly expenses.
- Responsive and user-friendly interface.
- Backend API with CRUD functionality for managing expenses.
- User authentication for login and signup.

## Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB

## API Endpoints

### Base URL
`http://localhost:8000`

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| POST   | `/expenses`      | Add a new expense.          |
| GET    | `/expenses`      | Retrieve all expenses.      |
| PUT    | `/expenses/:id`  | Update an existing expense. |
| DELETE | `/expenses/:id`  | Delete an expense.          |
| POST   | `/user/login`    | User login.                 |
| POST   | `/user/signup`   | User signup.                |

# Example User Credentials
- Email: `testinguser@gmail.com`
- Password: `test123`

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

## Installation

Follow these steps to run the project locally:

### Backend Setup
1. Clone the repository:
   ```powershell
   git clone https://github.com/Priyanshu52002/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. Navigate to the `backend` directory:
   ```powershell
   cd backend
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add the following:
   ```env
   MONGODB_CONNECTION_URL=<your_mongodb_connection_url>
   PORT=8000
   JWT_SECRET=<your_jwt_secret>
   FRONTEND_BASE_URL=http://localhost:5173  #You can add your frontend local base URL here that u will get on startin react project
   ```

5. Start the backend server in development mode (with hot-reloading using Nodemon):
   ```powershell
   npm run dev
   ```

6. Alternatively, start the backend server in production mode:
   ```powershell
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```powershell
   cd ../frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the following:
   ```env
   VITE_REACT_APP_BACKEND_BASEURL=http://localhost:8000
   ```

4. Start the frontend development server:
   ```powershell
   npm start
   ```
## Architecture

1. **Frontend**:
   - A React-based interface for users to manage their expenses.
   - Includes forms, charts, and a list view.

2. **Backend**:
   - Node.js and Express.js for handling API requests.
   - Provides CRUD operations for expense records.
   - User authentication endpoints for signup and login.

3. **Database**:
   - MongoDB stores:
     - Expense records with fields for ID, amount, category, description, and date.
     - User information, including name, email, and hashed password.

## Optional Features
- User authentication for tracking expenses individually.
