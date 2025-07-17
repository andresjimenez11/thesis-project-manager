# Thesis Project Manager

![GitHub issues](https://img.shields.io/github/issues/andresjimenez11/thesis-project-manager?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/andresjimenez11/thesis-project-manager?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/andresjimenez11/thesis-project-manager?style=for-the-badge)

A full-stack project management tool developed for **Tesis**, a global company dedicated to providing professional IT and Automation services. This tool is designed to help its teams organize, track, and complete projects efficiently, enabling comprehensive management of tasks, projects, teams, and priorities with a modern and intuitive user interface.

## ✨ Key Features

- **Project Management:** Create, update, and delete projects. View all your projects on a central dashboard.
- **Task Management:** Assign tasks to projects and users, set priorities (Urgent, High, Medium, Low), and due dates.
- **Flexible Views:** Visualize your tasks and projects in different formats:
    - **Board View (Kanban):** Organize tasks by status (To Do, In Progress, Done).
    - **List View:** A simple and clear list of all tasks.
    - **Table View:** Detailed task data in a tabular format.
    - **Timeline:** Plan and visualize your project schedule.
- **Team Collaboration:** Create teams, assign members to projects, and facilitate collaboration.
- **Authentication & Users:** Registration and login system to manage access.
- **Global Search:** Quickly find projects, tasks, or users throughout the application.

---

## 🛠️ Tech Stack

This project is a monorepo application with a separate client and server.

### Frontend (Client)

- **Framework:** [Next.js](https://nextjs.org/) 14+ (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI/Components:** Custom components and Headless UI.

### Backend (Server)

- **Environment:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/) for safe and easy database interaction.
- **Database:** Compatible with PostgreSQL, MySQL, SQLite, etc. (configurable in Prisma).

---

## 🚀 Installation and Setup

Follow these steps to set up and run the project in your local environment.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Git](https://git-scm.com/)
- A package manager like `npm` or `yarn`.

### 1. Clone the Repository

```bash
git clone https://github.com/andresjimenez11/thesis-project-manager.git
cd thesis-project-manager
```

### 2. Backend Setup

First, set up and run the server.

```bash
# Navigate to the server folder
cd server

# Install dependencies
npm install

# Create a .env file from the example
# and configure it with your database URL.
# Example for PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
touch .env
```

**Contents of the `server/.env` file:**
```
DATABASE_URL="YOUR_DATABASE_URL_HERE"
```

```bash
# Run database migrations with Prisma
npx prisma migrate dev

# (Optional) Seed the database with sample data
npx prisma db seed

# Start the development server
npm run dev
```
The server will be running at `http://localhost:5000` (or the port you have configured).

### 3. Frontend Setup

Now, set up and run the client.

```bash
# From the project root, navigate to the client folder
cd ../client

# Install dependencies
npm install

# Create a .env.local file for the client's environment variables.
# Point it to your backend API URL.
touch .env.local
```

**Contents of the `client/.env.local` file:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
# Start the development client
npm run dev
```
The web application will be available at `http://localhost:3000`.

---

## 🤝 How to Contribute

Contributions are welcome. If you wish to improve this project, please follow these steps:

1.  **Fork** this repository.
2.  Create a new branch (`git checkout -b feature/new-feature`).
3.  Make your changes and **Commit** them (`git commit -m 'Add new feature'`).
4.  **Push** to your branch (`git push origin feature/new-feature`).
5.  Open a **Pull Request**.

Please open an [issue](https://github.com/andresjimenez11/thesis-project-manager/issues) first to discuss any major changes you wish to make.

---

## 📄 License

This project is under the MIT License. See the `LICENSE` file for more details.

---

## 👤 Author

**Andrés Felipe Jiménez**
- GitHub: [@andresjimenez11](https://github.com/andresjimenez11)