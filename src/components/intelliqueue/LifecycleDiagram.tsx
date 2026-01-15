/**
 * Lifecycle Diagram Component
 * 
 * Visual representation of the task lifecycle:
 * PENDING → PROCESSING → COMPLETED / FAILED
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, RotateCw, GitBranch } from 'lucide-react';

export const LifecycleDiagram: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Task Lifecycle Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4">
          {/* PENDING */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-16 rounded-lg bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center">
              <span className="font-semibold text-yellow-700">PENDING</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1">Task in queue</span>
          </div>
          
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
          
          {/* PROCESSING */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-16 rounded-lg bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
              <span className="font-semibold text-blue-700">PROCESSING</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1">Worker executing</span>
          </div>
          
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
          
          {/* Success/Failure Branch */}
          <div className="flex flex-col gap-3">
            {/* COMPLETED */}
            <div className="flex items-center gap-2">
              <div className="w-28 h-12 rounded-lg bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                <span className="font-semibold text-green-700 text-sm">COMPLETED</span>
              </div>
              <span className="text-xs text-muted-foreground">Success</span>
            </div>
            
            {/* FAILED */}
            <div className="flex items-center gap-2">
              <div className="w-28 h-12 rounded-lg bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center">
                <span className="font-semibold text-red-700 text-sm">FAILED</span>
              </div>
              <span className="text-xs text-muted-foreground">After 3 retries</span>
            </div>
          </div>
        </div>
        
        {/* Retry Loop */}
        <div className="flex items-center justify-center gap-2 mt-4 p-3 rounded-lg bg-secondary">
          <RotateCw className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            On failure (retries {'<'} 3): Return to PENDING and retry
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
