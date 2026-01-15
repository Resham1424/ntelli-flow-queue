/**
 * Documentation Component
 * 
 * Assignment-ready documentation sections:
 * - Objective
 * - Theory
 * - Algorithm
 * - Result
 * - Conclusion
 * - Future Scope
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Target, 
  BookOpen, 
  Code2, 
  BarChart3, 
  CheckSquare, 
  Rocket 
} from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Assignment Documentation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {/* Objective */}
          <AccordionItem value="objective">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                1. Objective
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-2 text-muted-foreground">
              <p>
                The objective of this project is to design and implement a <strong>Distributed Task 
                Scheduling & Notification System</strong> called IntelliQueue. This system demonstrates:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Asynchronous task creation and queue management</li>
                <li>Background worker simulation for task processing</li>
                <li>Task lifecycle management (PENDING → PROCESSING → COMPLETED/FAILED)</li>
                <li>Retry mechanism for failed tasks with configurable retry limits</li>
                <li>Real-time notification system for task status updates</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Theory */}
          <AccordionItem value="theory">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                2. Theory
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3 text-muted-foreground">
              <p><strong>Task Queue:</strong> A First-In-First-Out (FIFO) data structure that holds 
              tasks waiting to be processed. Tasks are added to the end and picked from the front.</p>
              
              <p><strong>Task Lifecycle:</strong> Each task goes through defined states:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>PENDING:</strong> Task created and waiting in queue</li>
                <li><strong>PROCESSING:</strong> Worker has picked the task and is executing it</li>
                <li><strong>COMPLETED:</strong> Task executed successfully</li>
                <li><strong>FAILED:</strong> Task failed after maximum retry attempts</li>
              </ul>
              
              <p><strong>Background Worker:</strong> A process that continuously monitors the queue, 
              picks tasks, and processes them asynchronously. This enables non-blocking task execution.</p>
              
              <p><strong>Retry Mechanism:</strong> When a task fails, instead of immediately marking 
              it as failed, the system attempts to retry execution up to a maximum number of times 
              (default: 3). This increases reliability in distributed systems.</p>
              
              <p><strong>Notification System:</strong> Observers are notified of task status changes, 
              enabling real-time updates and logging for monitoring purposes.</p>
            </AccordionContent>
          </AccordionItem>

          {/* Algorithm */}
          <AccordionItem value="algorithm">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                3. Algorithm
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3 text-muted-foreground">
              <div>
                <p className="font-semibold mb-2">Task Creation Algorithm:</p>
                <pre className="bg-secondary p-3 rounded text-xs overflow-x-auto">
{`1. START
2. Accept task type and payload from user
3. Generate unique task ID
4. Create task object with:
   - status = PENDING
   - retryCount = 0
   - timestamps
5. Store task in tasks array (database simulation)
6. Add task ID to queue (FIFO)
7. Log notification: "Task created"
8. Return task ID immediately (async pattern)
9. END`}
                </pre>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Worker Processing Algorithm:</p>
                <pre className="bg-secondary p-3 rounded text-xs overflow-x-auto">
{`1. START
2. WHILE worker is running:
   a. Check if queue has pending tasks
   b. IF queue is empty:
      - Wait and check again
   c. ELSE:
      - Pick first task from queue (FIFO)
      - Update task status = PROCESSING
      - Log notification: "Processing task"
      - Simulate execution (delay)
      - Generate random success/failure
      
   d. IF execution successful:
      - Update status = COMPLETED
      - Log notification: "Task completed"
      
   e. ELSE (execution failed):
      - Increment retryCount
      - IF retryCount < MAX_RETRIES (3):
         - Update status = PENDING
         - Re-add to queue
         - Log: "Retry attempt X/3"
      - ELSE:
         - Update status = FAILED
         - Log notification: "Task failed"
         
3. END WHILE
4. END`}
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Result */}
          <AccordionItem value="result">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                4. Result
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-2 text-muted-foreground">
              <p>The IntelliQueue system successfully demonstrates:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Task creation with immediate ID return (asynchronous pattern)</li>
                <li>FIFO queue management for fair task processing</li>
                <li>Visual representation of task lifecycle states</li>
                <li>Automatic retry mechanism (up to 3 attempts) for failed tasks</li>
                <li>Real-time notifications for task status changes</li>
                <li>Configurable worker speed and failure rate for testing</li>
                <li>Statistics dashboard showing task distribution</li>
              </ul>
              <p className="mt-2">
                <strong>Test the system:</strong> Create multiple tasks, start the worker, 
                and observe how tasks transition through states. Adjust the failure rate 
                to see the retry mechanism in action.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Conclusion */}
          <AccordionItem value="conclusion">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                5. Conclusion
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-2 text-muted-foreground">
              <p>
                The IntelliQueue project successfully implements a distributed task scheduling 
                and notification system that demonstrates key concepts in asynchronous programming 
                and distributed systems:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Decoupling of task creation from task execution</li>
                <li>Reliable task processing with retry mechanisms</li>
                <li>State management for tracking task lifecycle</li>
                <li>Event-driven notifications for system observability</li>
              </ul>
              <p className="mt-2">
                This simulation provides a foundation for understanding how production-grade 
                message queues and task schedulers work in real-world applications.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Future Scope */}
          <AccordionItem value="future">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                6. Future Scope
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-2 text-muted-foreground">
              <p>The IntelliQueue system can be enhanced with:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong>Redis Integration:</strong> Replace in-memory queue with Redis 
                  for persistent, distributed queue management across multiple server instances.
                </li>
                <li>
                  <strong>Real Background Workers:</strong> Implement actual background 
                  processes using Node.js worker threads or separate service containers.
                </li>
                <li>
                  <strong>Cloud Deployment:</strong> Deploy on cloud platforms (AWS, GCP, Azure) 
                  with auto-scaling based on queue depth.
                </li>
                <li>
                  <strong>Database Persistence:</strong> Store tasks in PostgreSQL/MongoDB 
                  for durability and complex queries.
                </li>
                <li>
                  <strong>Priority Queues:</strong> Implement task priorities for 
                  processing critical tasks first.
                </li>
                <li>
                  <strong>Dead Letter Queue:</strong> Store permanently failed tasks 
                  for later analysis and manual retry.
                </li>
                <li>
                  <strong>Webhooks:</strong> Send HTTP notifications to external 
                  systems on task completion/failure.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
