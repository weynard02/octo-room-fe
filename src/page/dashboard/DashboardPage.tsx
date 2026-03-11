import React from "react";
import { Card, Button } from "../../components";

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your dashboard!</p>
        </div>
        <Button variant="outline" size="sm">
          Download Report
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Recent Appointments"
          footer={
            <Button variant="outline" size="sm" className="w-full">
              View All
            </Button>
          }
        >
          <p className="text-gray-500 italic text-sm">
            No upcoming appointments scheduled.
          </p>
        </Card>

        <Card
          title="Account Summary"
          description="Current status and membership"
        >
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p className="text-gray-700 font-medium text-sm">Status: Active</p>
          </div>
          <p className="text-gray-600 text-sm mt-2">Member since: Jan 2026</p>
        </Card>

        <Card title="Notifications">
          <ul className="space-y-3">
            <li className="text-sm text-gray-600 border-l-4 border-blue-500 pl-3">
              Your profile is 80% complete.
            </li>
            <li className="text-sm text-gray-600 border-l-4 border-yellow-500 pl-3">
              New message from Support.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
