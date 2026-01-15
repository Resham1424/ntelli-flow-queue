/**
 * IntelliQueue - Task Queue Context
 * 
 * This context provides centralized state management for the task queue.
 * It handles:
 * - Task creation and storage
 * - Queue management (in-memory array)
 * - Notification logging
 * 
 * Algorithm Overview:
 * 1. Tasks are created with PENDING status
 * 2. Tasks are added to an in-memory queue
 * 3. Workers pick tasks from the queue for processing
 * 4. Status updates are tracked and logged
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Task, TaskStatus, TaskType, NotificationLog, MAX_RETRY_COUNT } from '@/types/task';

// Generate unique ID for tasks and logs
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

interface TaskQueueContextType {
  tasks: Task[];
  queue: string[];  // Queue stores task IDs
  notifications: NotificationLog[];
  isWorkerRunning: boolean;
  workerSpeed: number;
  failureRate: number;
  
  // Task operations
  createTask: (taskType: TaskType, payload: string) => string;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  incrementRetryCount: (taskId: string) => void;
  
  // Queue operations
  pickTaskFromQueue: () => Task | null;
  
  // Notification operations
  addNotification: (type: NotificationLog['type'], message: string) => void;
  clearNotifications: () => void;
  
  // Worker controls
  setWorkerRunning: (running: boolean) => void;
  setWorkerSpeed: (speed: number) => void;
  setFailureRate: (rate: number) => void;
  
  // Reset
  resetAll: () => void;
}

const TaskQueueContext = createContext<TaskQueueContextType | undefined>(undefined);

export const TaskQueueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State: All tasks stored in memory (simulating database)
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // State: Task queue (array of task IDs waiting to be processed)
  const [queue, setQueue] = useState<string[]>([]);
  
  // State: Notification logs
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  
  // State: Worker configuration
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);
  const [workerSpeed, setWorkerSpeed] = useState(2000); // milliseconds
  const [failureRate, setFailureRate] = useState(30); // percentage

  /**
   * Add a notification to the log
   * Step: Create notification entry with timestamp and add to log
   */
  const addNotification = useCallback((type: NotificationLog['type'], message: string) => {
    const notification: NotificationLog = {
      id: generateId(),
      timestamp: new Date(),
      type,
      message,
    };
    setNotifications(prev => [notification, ...prev].slice(0, 100)); // Keep last 100
    
    // Also log to console for demonstration
    const prefix = type === 'SUCCESS' ? '✅' : type === 'ERROR' ? '❌' : type === 'WARNING' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [IntelliQueue] ${message}`);
  }, []);

  /**
   * Create a new task
   * Algorithm Steps:
   * 1. Generate unique task ID
   * 2. Create task object with PENDING status
   * 3. Store task in tasks array (simulating database)
   * 4. Add task ID to queue
   * 5. Log notification
   * 6. Return task ID immediately (async pattern)
   */
  const createTask = useCallback((taskType: TaskType, payload: string): string => {
    const taskId = generateId();
    const now = new Date();
    
    const newTask: Task = {
      id: taskId,
      taskType,
      payload,
      status: 'PENDING',
      retryCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    
    // Step 3: Store task
    setTasks(prev => [...prev, newTask]);
    
    // Step 4: Add to queue
    setQueue(prev => [...prev, taskId]);
    
    // Step 5: Log notification
    addNotification('INFO', `Task ${taskId.slice(-8)} created with type: ${taskType}`);
    
    // Step 6: Return ID immediately
    return taskId;
  }, [addNotification]);

  /**
   * Update task status
   * Tracks the task lifecycle: PENDING → PROCESSING → COMPLETED/FAILED
   */
  const updateTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status,
          updatedAt: new Date(),
          completedAt: status === 'COMPLETED' || status === 'FAILED' ? new Date() : undefined,
        };
      }
      return task;
    }));
  }, []);

  /**
   * Increment retry count for a task
   * Used when task execution fails and needs to be retried
   */
  const incrementRetryCount = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          retryCount: task.retryCount + 1,
          updatedAt: new Date(),
        };
      }
      return task;
    }));
  }, []);

  /**
   * Pick a task from the queue for processing
   * Algorithm Steps:
   * 1. Check if queue has tasks
   * 2. Get the first task ID (FIFO - First In, First Out)
   * 3. Remove task from queue
   * 4. Return the full task object
   */
  const pickTaskFromQueue = useCallback((): Task | null => {
    if (queue.length === 0) return null;
    
    const taskId = queue[0];
    
    // Remove from queue
    setQueue(prev => prev.slice(1));
    
    // Find and return the task
    const task = tasks.find(t => t.id === taskId);
    return task || null;
  }, [queue, tasks]);

  /**
   * Clear all notifications
   */
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Set worker running state
   */
  const setWorkerRunning = useCallback((running: boolean) => {
    setIsWorkerRunning(running);
  }, []);

  /**
   * Reset all state
   */
  const resetAll = useCallback(() => {
    setTasks([]);
    setQueue([]);
    setNotifications([]);
    setIsWorkerRunning(false);
    addNotification('INFO', 'System reset complete');
  }, [addNotification]);

  const value: TaskQueueContextType = {
    tasks,
    queue,
    notifications,
    isWorkerRunning,
    workerSpeed,
    failureRate,
    createTask,
    updateTaskStatus,
    incrementRetryCount,
    pickTaskFromQueue,
    addNotification,
    clearNotifications,
    setWorkerRunning,
    setWorkerSpeed,
    setFailureRate,
    resetAll,
  };

  return (
    <TaskQueueContext.Provider value={value}>
      {children}
    </TaskQueueContext.Provider>
  );
};

export const useTaskQueue = (): TaskQueueContextType => {
  const context = useContext(TaskQueueContext);
  if (!context) {
    throw new Error('useTaskQueue must be used within a TaskQueueProvider');
  }
  return context;
};
