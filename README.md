## Gigly
### Overview
Gigly is a freelancer productivity and project management website designed to help independent professionals stay organized. Instead of juggling multiple tools for managing projects, tasks, clients, deadlines, and payments, Gigly provides a centralized workspace where freelancers can keep everything in one place.

### Problem Statement

Freelancers often use several different applications to manage their work, such as task managers, spreadsheets, calendars, note-taking apps, and invoicing tools. Switching between these platforms can be time-consuming and lead to missed deadlines, forgotten tasks, and unpaid invoices.

Gigly addresses this problem by providing a single platform where freelancers can manage their workflow efficiently.

## Features

### Dashboard

- Overview of active projects
- Upcoming deadlines
- Pending invoices
- Recent activities
- Task completion statistics

### Project Management
- Create new projects
- Edit project information
- Archive completed projects
- Track project status
 
### Task Management
- Create tasks within projects
- Assign priorities
- Mark tasks as:
    - To Do
    - In Progress
    - Completed

### Client Management
- Store client details
- View all projects belonging to a client

### Invoice & Payment Tracking
- Create invoice records
- Mark invoices as Paid or Unpaid
- Track outstanding payments
- Monitor monthly earnings

### Deadline Management
- Set project deadlines
- Receive reminders for upcoming due dates
- Highlight overdue projects

### Search & Filtering
- Search projects
- Filter by status
- Filter by client
- Filter by deadline

## Tech Stack
- React
- Vite
- Tailwind CSS
- JavaScript (ES6+)
- Firebase

## Project Structure
```
src/
│
├── assets/
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── Footer.jsx
│   │
│   ├── ui/
│   ├── dashboard/
│   ├── projects/
│   ├── tasks/
│   
│
├── context/
│
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   ├── Tasks.jsx
│   ├── About.jsx
│   ├── Login.jsx
│  
├── App.jsx
└── main.jsx
```
## Installation

Clone the repository
```
git clone https://github.com/your-username/gigly.git
```
Navigate to the project folder
```
cd gigly
```
Install dependencies
```
npm install
```
Run the development server
```
npm run dev
```

## Future Enhancements

- Mobile application
- Email notifications for deadlines
- Team collaboration

### license

MIT license

### Live URL
```
https://gigly-xi.vercel.app/
```

### Author

Idah Karwitha - frontend developer

