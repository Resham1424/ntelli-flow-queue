/**
 * Task Creator Component
 * 
 * Allows users to create new tasks with:
 * - Task type selection
 * - Custom payload input
 * 
 * Demonstrates the task creation flow in the system.
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTaskQueue } from '@/context/TaskQueueContext';
import { TASK_TYPES, TaskType } from '@/types/task';
import { Plus, Zap } from 'lucide-react';

const TASK_DESCRIPTIONS: Record<TaskType, string> = {
  EMAIL: 'Send email notification',
  REPORT: 'Generate data report',
  BACKUP: 'Create data backup',
  NOTIFICATION: 'Push notification',
  SYNC: 'Synchronize data',
};

export const TaskCreator: React.FC = () => {
  const { createTask } = useTaskQueue();
  const [taskType, setTaskType] = useState<TaskType>('EMAIL');
  const [payload, setPayload] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payload.trim()) return;
    
    createTask(taskType, payload.trim());
    setPayload('');
  };

  const handleQuickCreate = () => {
    const randomType = TASK_TYPES[Math.floor(Math.random() * TASK_TYPES.length)];
    const randomPayloads = [
      'user@example.com',
      'Monthly sales report',
      'Database snapshot',
      'New order #12345',
      'Sync user profiles',
    ];
    const randomPayload = randomPayloads[Math.floor(Math.random() * randomPayloads.length)];
    createTask(randomType, randomPayload);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Task
        </CardTitle>
        <CardDescription>
          Add a new task to the queue for processing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Task Type</label>
            <Select value={taskType} onValueChange={(v) => setTaskType(v as TaskType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TASK_TYPES.map(type => (
                  <SelectItem key={type} value={type}>
                    <div className="flex flex-col">
                      <span className="font-medium">{type}</span>
                      <span className="text-xs text-muted-foreground">{TASK_DESCRIPTIONS[type]}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payload Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payload</label>
            <Input
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              placeholder="Enter task data..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={!payload.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add to Queue
            </Button>
            <Button type="button" variant="outline" onClick={handleQuickCreate}>
              <Zap className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
