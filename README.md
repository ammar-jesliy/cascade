# Cascade - Task Manager Web Application

Welcome to **Cascade**, a comprehensive task management web application designed to help you streamline your workflow, enhance productivity, and manage your tasks, projects, and teams effectively.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
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

## Contributing

We welcome contributions from the community to make Cascade better.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using Cascade! We hope it helps you stay organized and productive. If you have any questions or feedback, please don't hesitate to reach out.
