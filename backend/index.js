// Simple task queue simulation
const taskQueue = [];
let taskIdCounter = 1;

// Create task
function createTask(taskType, payload) {
  const task = {
    id: taskIdCounter++,
    taskType,
    payload,
    status: "PENDING",
    retryCount: 0
  };
  taskQueue.push(task);
  console.log("Task added:", task);
  return task;
}

// Worker simulation
function processTask() {
  if (taskQueue.length === 0) {
    console.log("No tasks in queue");
    return;
  }

  const task = taskQueue.shift();
  task.status = "PROCESSING";
  console.log("Processing task:", task.id);

  try {
    // simulate execution
    console.log("Executing task:", task.taskType);
    task.status = "COMPLETED";
    console.log("Task completed:", task.id);
  } catch (error) {
    task.retryCount++;
    if (task.retryCount < 3) {
      console.log("Retrying task:", task.id);
      taskQueue.push(task);
    } else {
      task.status = "FAILED";
      console.log("Task failed:", task.id);
    }
  }
}

// Demo
createTask("Send Email", { to: "user@example.com" });
processTask();
