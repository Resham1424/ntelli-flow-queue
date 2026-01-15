/**
 * Notification Panel Component
 * 
 * Displays system notifications and logs.
 * Simulates console output for demonstrating:
 * - Task completion notifications
 * - Task failure notifications
 * - System events
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTaskQueue } from '@/context/TaskQueueContext';
import { Bell, Trash2, Info, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const TYPE_CONFIG = {
  INFO: { icon: Info, color: 'text-blue-600' },
  SUCCESS: { icon: CheckCircle, color: 'text-green-600' },
  ERROR: { icon: XCircle, color: 'text-red-600' },
  WARNING: { icon: AlertTriangle, color: 'text-yellow-600' },
};

export const NotificationPanel: React.FC = () => {
  const { notifications, clearNotifications } = useTaskQueue();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            System Notifications
          </CardTitle>
          <CardDescription>
            Console output simulation
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearNotifications}
          disabled={notifications.length === 0}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-2 font-mono text-sm">
              {notifications.map(notification => {
                const config = TYPE_CONFIG[notification.type];
                const Icon = config.icon;
                return (
                  <div
                    key={notification.id}
                    className="flex items-start gap-2 p-2 rounded bg-secondary/50"
                  >
                    <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="break-words">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(notification.timestamp)}
                      </span>
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
