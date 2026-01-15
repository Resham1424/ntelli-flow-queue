/**
 * Worker Control Component
 * 
 * Controls for the background worker simulation:
 * - Start/Stop worker
 * - Adjust processing speed
 * - Configure failure rate (for testing retry logic)
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTaskQueue } from '@/context/TaskQueueContext';
import { Play, Square, Gauge, AlertTriangle, RotateCcw } from 'lucide-react';

export const WorkerControl: React.FC = () => {
  const {
    isWorkerRunning,
    workerSpeed,
    failureRate,
    queue,
    setWorkerRunning,
    setWorkerSpeed,
    setFailureRate,
    resetAll,
  } = useTaskQueue();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Worker Control
        </CardTitle>
        <CardDescription>
          Control the background worker simulation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Worker Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isWorkerRunning ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="font-medium">
              {isWorkerRunning ? 'Worker Running' : 'Worker Stopped'}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {queue.length} tasks in queue
          </span>
        </div>

        {/* Start/Stop Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setWorkerRunning(true)}
            disabled={isWorkerRunning}
            className="flex-1"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Worker
          </Button>
          <Button
            onClick={() => setWorkerRunning(false)}
            disabled={!isWorkerRunning}
            variant="destructive"
            className="flex-1"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop Worker
          </Button>
        </div>

        {/* Processing Speed */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              Processing Speed
            </span>
            <span className="text-muted-foreground">{workerSpeed}ms per task</span>
          </div>
          <Slider
            value={[workerSpeed]}
            onValueChange={([v]) => setWorkerSpeed(v)}
            min={500}
            max={5000}
            step={100}
            disabled={isWorkerRunning}
          />
          <p className="text-xs text-muted-foreground">
            Lower = faster processing (disable worker to change)
          </p>
        </div>

        {/* Failure Rate */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Simulated Failure Rate
            </span>
            <span className="text-muted-foreground">{failureRate}%</span>
          </div>
          <Slider
            value={[failureRate]}
            onValueChange={([v]) => setFailureRate(v)}
            min={0}
            max={80}
            step={5}
            disabled={isWorkerRunning}
          />
          <p className="text-xs text-muted-foreground">
            Higher = more failures to demonstrate retry logic
          </p>
        </div>

        {/* Reset Button */}
        <Button variant="outline" onClick={resetAll} className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All
        </Button>
      </CardContent>
    </Card>
  );
};
