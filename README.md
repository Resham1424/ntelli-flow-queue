# IntelliQueue – Distributed Task Scheduling & Notification System

## Project Overview
IntelliQueue is a system that handles tasks asynchronously, allowing long or heavy operations to run in the background without making the user wait. Tasks like sending emails, generating reports, or processing data are added to a queue and executed later by a worker, simulating real-world asynchronous systems.

---

## Live Demo (Frontend)
You can view the frontend of the project here:  
[https://ntelli-flow-queue.lovable.app](https://ntelli-flow-queue.lovable.app)

---

## Features

### Frontend
- Built with **Lovable (React + TypeScript + Vite)**  
- User-friendly interface for creating tasks  
- Displays task status updates (pending, processing, completed)  

### Backend Simulation
- Implemented in **Node.js**  
- Tasks added to an **in-memory queue**  
- Worker processes tasks sequentially  
- Task lifecycle: `PENDING → PROCESSING → COMPLETED / FAILED`  
- Retry mechanism implemented  

---

## Folder Structure

ntelli-flow-queue/
│── backend/ # Backend simulation
│ └── index.js # Task queue + worker
│── src/ # Lovable frontend
│── README.md


---

## How to Run Backend Simulation

1. **Clone the repository**

```bash
git clone https://github.com/Resham1424/ntelli-flow-queue.git

cd ntelli-flow-queue/backend

node index.js

Task added: { id: 1, taskType: 'Send Email', status: 'PENDING', retryCount: 0 }
Processing task: 1
Executing task: Send Email
Task completed: 1
How It Works

Task Creation: Tasks are added via frontend or directly in backend simulation.

Queue: Tasks are stored in an in-memory queue.

Worker Execution: A background worker processes one task at a time.

Status Updates: Each task goes through:

PENDING

PROCESSING

COMPLETED or FAILED

Retries: Tasks are retried automatically up to 3 times if they fail.

Technologies Used

Frontend: Lovable (React + TypeScript + Vite)

Backend Simulation: Node.js (in-memory queue)

Database: Not required for simulation (can integrate PostgreSQL/Redis in real implementation)

Future Enhancements

Connect frontend with real backend using APIs

Store tasks in Redis/PostgreSQL for persistence

Real-time notifications to users on task completion/failure

Handle multiple workers for parallel task processing

GitHub Repository

https://github.com/Resham1424/ntelli-flow-queue
