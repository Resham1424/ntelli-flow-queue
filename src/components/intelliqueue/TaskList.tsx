/**
 * Task List Component
 * 
 * Displays all tasks with their current status.
 * Demonstrates the task lifecycle visually:
 * PENDING → PROCESSING → COMPLETED / FAILED
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTaskQueue } from '@/context/TaskQueueContext';
import { TaskStatus } from '@/types/task';
import { ListTodo, Clock, Loader2, CheckCircle2, XCircle, RotateCw } from 'lucide-react';

const STATUS_CONFIG: Record<TaskStatus, { color: string; icon: React.ReactNode }> = {
  PENDING: { 
    color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
    icon: <Clock className="h-3 w-3" />
  },
  PROCESSING: { 
    color: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
    icon: <Loader2 className="h-3 w-3 animate-spin" />
  },
  COMPLETED: { 
    color: 'bg-green-500/20 text-green-700 border-green-500/30',
    icon: <CheckCircle2 className="h-3 w-3" />
  },
  FAILED: { 
    color: 'bg-red-500/20 text-red-700 border-red-500/30',
    icon: <XCircle className="h-3 w-3" />
  },
};

export const TaskList: React.FC = () => {
  const { tasks } = useTaskQueue();
  
  // Sort tasks: processing first, then pending, then completed/failed by date
  const sortedTasks = [...tasks].sort((a, b) => {
    const statusOrder: Record<TaskStatus, number> = {
      PROCESSING: 0,
      PENDING: 1,
      COMPLETED: 2,
      FAILED: 2,
    };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListTodo className="h-5 w-5" />
          Task Queue
          <Badge variant="secondary" className="ml-2">{tasks.length}</Badge>
        </CardTitle>
        <CardDescription>
          All tasks and their current lifecycle status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ListTodo className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedTasks.map(task => {
                const config = STATUS_CONFIG[task.status];
                return (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg border ${
                      task.status === 'PROCESSING' 
                        ? 'border-blue-500/50 bg-blue-500/5' 
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {task.taskType}
                          </Badge>
                          <Badge className={`text-xs ${config.color}`}>
                            {config.icon}
                            <span className="ml-1">{task.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm truncate" title={task.payload}>
                          {task.payload}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>ID: {task.id.slice(-8)}</span>
                          {task.retryCount > 0 && (
                            <span className="flex items-center gap-1">
                              <RotateCw className="h-3 w-3" />
                              Retries: {task.retryCount}/3
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
