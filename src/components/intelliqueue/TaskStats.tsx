/**
 * Task Statistics Component
 * 
 * Displays real-time statistics about task processing.
 * Helps visualize the task lifecycle distribution.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTaskQueue } from '@/context/TaskQueueContext';
import { Clock, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export const TaskStats: React.FC = () => {
  const { tasks } = useTaskQueue();

  const stats = {
    pending: tasks.filter(t => t.status === 'PENDING').length,
    processing: tasks.filter(t => t.status === 'PROCESSING').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    failed: tasks.filter(t => t.status === 'FAILED').length,
  };

  const statItems = [
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600 bg-yellow-500/10' },
    { label: 'Processing', value: stats.processing, icon: Loader2, color: 'text-blue-600 bg-blue-500/10' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-600 bg-green-500/10' },
    { label: 'Failed', value: stats.failed, icon: XCircle, color: 'text-red-600 bg-red-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map(item => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
