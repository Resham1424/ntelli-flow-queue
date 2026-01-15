/**
 * IntelliQueue - Distributed Task Scheduling & Notification System
 * 
 * Main Application Page
 * 
 * This is the entry point for the IntelliQueue simulation.
 * It provides an interactive interface to demonstrate:
 * - Task creation and queue management
 * - Background worker processing
 * - Task lifecycle visualization
 * - Real-time notifications
 */

import React from 'react';
import { TaskQueueProvider } from '@/context/TaskQueueContext';
import { useWorker } from '@/hooks/useWorker';
import { TaskCreator } from '@/components/intelliqueue/TaskCreator';
import { WorkerControl } from '@/components/intelliqueue/WorkerControl';
import { TaskList } from '@/components/intelliqueue/TaskList';
import { NotificationPanel } from '@/components/intelliqueue/NotificationPanel';
import { TaskStats } from '@/components/intelliqueue/TaskStats';
import { LifecycleDiagram } from '@/components/intelliqueue/LifecycleDiagram';
import { Documentation } from '@/components/intelliqueue/Documentation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, BookOpen } from 'lucide-react';

// Wrapper component to use the worker hook
const IntelliQueueApp: React.FC = () => {
  useWorker(); // Activate worker processing

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Server className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">IntelliQueue</h1>
              <p className="text-sm text-muted-foreground">
                Distributed Task Scheduling & Notification System
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="simulation" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Simulation
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Documentation
            </TabsTrigger>
          </TabsList>

          {/* Simulation Tab */}
          <TabsContent value="simulation" className="space-y-6">
            {/* Statistics */}
            <TaskStats />

            {/* Lifecycle Diagram */}
            <LifecycleDiagram />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Controls */}
              <div className="space-y-6">
                <TaskCreator />
                <WorkerControl />
              </div>

              {/* Middle Column: Task List */}
              <div>
                <TaskList />
              </div>

              {/* Right Column: Notifications */}
              <div>
                <NotificationPanel />
              </div>
            </div>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation">
            <Documentation />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          IntelliQueue - Academic Project Demonstration
        </div>
      </footer>
    </div>
  );
};

// Main export wrapped with context provider
const Index: React.FC = () => {
  return (
    <TaskQueueProvider>
      <IntelliQueueApp />
    </TaskQueueProvider>
  );
};

export default Index;
