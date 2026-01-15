/**
 * IntelliQueue - Distributed Task Scheduling & Notification System
 * 
 * Task Type Definitions
 * These types define the structure of tasks in our queue system.
 */

// Task status enum representing the lifecycle states
export type TaskStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

// Available task types for simulation
export type TaskType = 'EMAIL' | 'REPORT' | 'BACKUP' | 'NOTIFICATION' | 'SYNC';

// Main Task interface with all required fields
export interface Task {
  id: string;                    // Unique identifier for the task
  taskType: TaskType;            // Type of task to be executed
  payload: string;               // Task payload/data
  status: TaskStatus;            // Current status of the task
  retryCount: number;            // Number of retry attempts made
  createdAt: Date;               // Timestamp when task was created
  updatedAt: Date;               // Timestamp of last update
  completedAt?: Date;            // Timestamp when task completed (if applicable)
}

// Notification log entry for tracking system events
export interface NotificationLog {
  id: string;
  timestamp: Date;
  type: 'INFO' | 'SUCCESS' | 'ERROR' | 'WARNING';
  message: string;
}

// Constants for task processing
export const MAX_RETRY_COUNT = 3;
export const TASK_TYPES: TaskType[] = ['EMAIL', 'REPORT', 'BACKUP', 'NOTIFICATION', 'SYNC'];
