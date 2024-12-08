# Task Management API

This is a RESTful API for managing tasks with features to create, read, update, and delete tasks. The API supports input validation and error handling, and is built with **Node.js**, **Express**, and **MongoDB**.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Postman Collection](#postman-collections)
- [API Endpoints](#api-endpoints)
  - [Create Task](#create-task)
  - [Get Tasks](#get-tasks)
  - [Get Task by ID](#get-task-by-id)
  - [Update Task](#update-task)
  - [Delete Task](#delete-task)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [License](#license)

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (>= v18)
- **MongoDB** (local or cloud instance like MongoDB Atlas)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/kumar964050/Task-Management-API.git
   cd task-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   DB_URL=mongodb://localhost:27017/task-management-api-test
   JWT_SECRET=secret-code
   ```

4. Start the application:
   ```bash
   npm run dev  # development
   npm start  # production
   ```

The API should now be running on `http://localhost:3000`.

## Environment Variables

You must configure the following environment variables in the `.env` file:

- `DB_URL`: The MongoDB connection URI.
- `PORT`: The port the application will run on (default is `3000`).
- `JWT_SECRET`: secret code.

## Postman Collections

- **Postman** (https://www.postman.com/carbooking/task-management-api/overview)

## API Endpoints

### 1. Create Task

- **URL**: `/tasks`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "TODO",
    "priority": "HIGH"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "task": {
        "_id": "task_id",
        "title": "Task Title",
        "description": "Task Description",
        "status": "TODO",
        "priority": "HIGH",
        "dueDate": "2024-12-31T23:59:59.999Z",
        "createdAt": "2024-12-08T00:00:00.000Z",
        "updatedAt": "2024-12-08T00:00:00.000Z"
      }
    }
  }
  ```

### 2. Get Tasks

- **URL**: `/tasks`
- **Method**: `GET`
- **Query Parameters**:
  - `status`: Filter by task status (`TODO`, `IN_PROGRESS`, `COMPLETED`).
  - `priority`: Filter by priority (`LOW`, `MEDIUM`, `HIGH`).
  - `sort`: Sort the results by a field (e.g., `createdAt`, `updatedAt`).
  - `limit`: Limit the number of tasks returned (default is `10`).
  - `skip`: Page the results (default is `1`).
- **Response**:
  ```json
  {
    "status": "success",
    "message": "fetched all tasks successfully",
    "results": "length of the tasks ex : 10",
    "data": {
      "tasks": [
        {
          "_id": "task_id",
          "title": "Task Title",
          "description": "Task Description",
          "status": "TODO",
          "priority": "HIGH",
          "dueDate": "2024-12-31T23:59:59.999Z",
          "createdAt": "2024-12-08T00:00:00.000Z",
          "updatedAt": "2024-12-08T00:00:00.000Z"
        }
      ]
    }
  }
  ```

### 3. Get Task by ID

- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "task": {
        "_id": "task_id",
        "title": "Task Title",
        "description": "Task Description",
        "status": "TODO",
        "priority": "HIGH",
        "dueDate": "2024-12-31T23:59:59.999Z",
        "createdAt": "2024-12-08T00:00:00.000Z",
        "updatedAt": "2024-12-08T00:00:00.000Z"
      }
    }
  }
  ```

### 4. Update Task

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "IN_PROGRESS",
    "priority": "MEDIUM",
    "dueDate": "2024-12-25T23:59:59.999Z"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "task": {
        "_id": "task_id",
        "title": "Updated Task Title",
        "description": "Updated Task Description",
        "status": "IN_PROGRESS",
        "priority": "MEDIUM",
        "dueDate": "2024-12-25T23:59:59.999Z",
        "createdAt": "2024-12-08T00:00:00.000Z",
        "updatedAt": "2024-12-08T00:00:00.000Z"
      }
    }
  }
  ```

### 5. Delete Task

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Response**: Status 204 (No Content)

---

## Running the Application

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Ensure that your MongoDB instance is running.
5. Start the server:
   ```bash
   npm start # production
   npm run dev # development
   ```
6. The application will be available at `http://localhost:3000`.

## Running Tests

1. To run the tests using Mocha and Chai, simply execute the following command:
   ```bash
   npm test
   ```
2. This will run all tests in the `tests/` directory.
