/**
 * IntelliQueue - Worker Simulation Hook
 * 
 * This hook simulates a background worker that:
 * 1. Picks tasks from the queue
 * 2. Processes them with simulated delay
 * 3. Handles success/failure scenarios
 * 4. Implements retry logic
 * 
 * Algorithm for Worker Processing:
 * Step 1: Check if queue has pending tasks
 * Step 2: Pick the first task (FIFO)
 * Step 3: Update status to PROCESSING
 * Step 4: Simulate execution with delay
 * Step 5: Determine success/failure (random based on failure rate)
 * Step 6a: On success → Update status to COMPLETED, log notification
 * Step 6b: On failure → Check retry count
 *   - If retryCount < MAX_RETRIES → Increment count, add back to queue
 *   - If retryCount >= MAX_RETRIES → Update status to FAILED, log notification
 */

import { useEffect, useRef, useCallback } from 'react';
import { useTaskQueue } from '@/context/TaskQueueContext';
import { MAX_RETRY_COUNT, Task } from '@/types/task';

export const useWorker = () => {
  const {
    tasks,
    queue,
    isWorkerRunning,
    workerSpeed,
    failureRate,
    updateTaskStatus,
    incrementRetryCount,
    addNotification,
  } = useTaskQueue();

  const processingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Simulate task execution
   * Returns true for success, false for failure
   * Failure rate is configurable for demonstration
   */
  const simulateExecution = useCallback((): boolean => {
    const random = Math.random() * 100;
    return random > failureRate;
  }, [failureRate]);

  /**
   * Process a single task
   * Implements the full task lifecycle
   */
  const processTask = useCallback(async (task: Task) => {
    const taskShortId = task.id.slice(-8);
    
    // Step 3: Update status to PROCESSING
    addNotification('INFO', `Worker picked task ${taskShortId} (${task.taskType}) - Processing...`);
    updateTaskStatus(task.id, 'PROCESSING');

    // Step 4: Simulate execution with delay
    await new Promise(resolve => setTimeout(resolve, workerSpeed));

    // Step 5: Determine success/failure
    const success = simulateExecution();

    if (success) {
      // Step 6a: Success path
      updateTaskStatus(task.id, 'COMPLETED');
      addNotification('SUCCESS', `Task ${taskShortId} completed successfully! Payload: "${task.payload}"`);
    } else {
      // Step 6b: Failure path
      const currentRetry = task.retryCount + 1;
      
      if (currentRetry < MAX_RETRY_COUNT) {
        // Retry the task
        incrementRetryCount(task.id);
        updateTaskStatus(task.id, 'PENDING');
        addNotification('WARNING', `Task ${taskShortId} failed. Retry ${currentRetry}/${MAX_RETRY_COUNT} - Re-queuing...`);
      } else {
        // Max retries exceeded - mark as failed
        incrementRetryCount(task.id);
        updateTaskStatus(task.id, 'FAILED');
        addNotification('ERROR', `Task ${taskShortId} FAILED after ${MAX_RETRY_COUNT} retries. Payload: "${task.payload}"`);
      }
    }
  }, [workerSpeed, simulateExecution, updateTaskStatus, incrementRetryCount, addNotification]);

  /**
   * Worker loop
   * Continuously processes tasks while worker is running
   */
  useEffect(() => {
    const runWorker = async () => {
      if (!isWorkerRunning || processingRef.current) return;
      
      // Find next pending task from queue
      const pendingTaskId = queue[0];
      if (!pendingTaskId) {
        // No tasks in queue, check again later
        timeoutRef.current = setTimeout(runWorker, 500);
        return;
      }

      const task = tasks.find(t => t.id === pendingTaskId && t.status === 'PENDING');
      if (!task) {
        timeoutRef.current = setTimeout(runWorker, 500);
        return;
      }

      processingRef.current = true;
      
      try {
        await processTask(task);
      } finally {
        processingRef.current = false;
        // Continue processing
        if (isWorkerRunning) {
          timeoutRef.current = setTimeout(runWorker, 300);
        }
      }
    };

    if (isWorkerRunning) {
      runWorker();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isWorkerRunning, queue, tasks, processTask]);

  return {
    isProcessing: processingRef.current,
  };
};
