# Cascade - Task Manager Web Application

Welcome to **Cascade**, a comprehensive task management web application designed to help you streamline your workflow, enhance productivity, and manage your tasks, projects, and teams effectively.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

Cascade is a full-stack task manager web application built to help individuals and teams organize their work and collaborate more efficiently. With Cascade, users can create groups, set statuses, manage tasks, and break them down into subtasks. This documentation provides an overview of the project, including the tools and technologies used, as well as instructions on how to install and use the application.

## Features

- **Group Creation:** Organize tasks and projects into groups for better management and clarity.
- **Status Creation:** Define different statuses for tasks to track their progress.
- **Task Management:** Create, update, and delete tasks within groups, and assign statuses to tasks.
- **Subtask Management:** Break down tasks into smaller, manageable subtasks for detailed tracking.
- **Real-time Collaboration:** Collaborate with team members in real-time with live updates.
- **User Authentication:** Secure user authentication and authorization using Appwrite.

## Technologies Used

### Backend
- **Appwrite:** Used for backend services including authentication, database, and storage.
  
### Frontend
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.

### Tools
- **React Router:** For client-side routing.
- **React Query:** For fetching, caching, and updating server state.
- **Vite:** Frontend tooling for fast build and development.
- **ESLint & Prettier:** For code linting and formatting.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- NPM or Yarn
- Appwrite instance

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cascade.git
   cd cascade
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set up Appwrite:**

   - Ensure you have an Appwrite instance running.
   - Create a new project in Appwrite and configure the necessary collections for users, groups, statuses, tasks, and subtasks.
   - Update the Appwrite configuration in your application (e.g., endpoint, project ID).

4. **Run the application:**

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

   The application should now be running on `http://localhost:3000`.

## Usage

### Group Creation

1. **Create a Group:**
   - Navigate to the sidebar and click on the "Create New Group" button.
   - Enter the group title and save.

2. **View Groups:**
   - All created groups are listed in the sidebar for easy access.
   - Click on any group to view its tasks and details.

### Status Creation

1. **Create a Status:**
   - Within a group, navigate to the statuses section.
   - Click on "Add Status," enter the status name, and save.

2. **Manage Statuses:**
   - View all statuses under a group and manage them as needed.

### Task Management

1. **Create a Task:**
   - Select a group and click on the "Create New Task" button.
   - Enter the task details, assign a status, and save.

2. **View and Update Tasks:**
   - Tasks are listed under their respective statuses.
   - Click on a task to view details, update status, or edit information.

3. **Delete a Task:**
   - Select the task and choose the delete option to remove it from the group.

### Subtask Management

1. **Create a Subtask:**
   - Within a task, click on "Add Subtask."
   - Enter the subtask details and save.

2. **View and Manage Subtasks:**
   - Subtasks are listed under their parent task.
   - Click on a subtask to view, edit, or delete it.

### Real-time Collaboration

- Changes made by one user are instantly reflected for all team members, ensuring everyone is always up-to-date.

## Contributing

We welcome contributions from the community to make Cascade better. If you wish to contribute, please follow these steps:

1. **Fork the repository:**
   Click on the "Fork" button at the top of this repository.

2. **Clone your fork:**

   ```bash
   git clone https://github.com/your-username/cascade.git
   ```

3. **Create a branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes and commit:**

   ```bash
   git commit -m 'Add some feature'
   ```

5. **Push to your branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request:**
   Go to the original repository and create a pull request from your fork.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using Cascade! We hope it helps you stay organized and productive. If you have any questions or feedback, please don't hesitate to reach out.
