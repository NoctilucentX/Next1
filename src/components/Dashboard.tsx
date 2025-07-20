'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminInterface from './interfaces/AdminInterface';
import InstructorInterface from './interfaces/InstructorInterface';
import StudentInterface from './interfaces/StudentInterface';

type UserRole = 'admin' | 'instructor' | 'student' | null;

export default function Dashboard() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const { user, logout } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const renderInterface = () => {
    switch (selectedRole) {
      case 'admin':
        return <AdminInterface />;
      case 'instructor':
        return <InstructorInterface />;
      case 'student':
        return <StudentInterface />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Sernan's Music Clinic</h1>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Welcome, {user?.email}</span>
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRoleSelect('admin')}>
                  <CardHeader>
                    <CardTitle>Administrator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Manage the entire music clinic system</p>
                    <ul className="text-sm space-y-1">
                      <li>• Student Registration & Enrollment</li>
                      <li>• Instructor Profiles</li>
                      <li>• Smart Scheduling</li>
                      <li>• Resource Management</li>
                      <li>• Financial Reports</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRoleSelect('instructor')}>
                  <CardHeader>
                    <CardTitle>Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Manage your students and schedule</p>
                    <ul className="text-sm space-y-1">
                      <li>• View Student Profiles</li>
                      <li>• Record Attendance</li>
                      <li>• Manage Schedule</li>
                      <li>• View Resources</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRoleSelect('student')}>
                  <CardHeader>
                    <CardTitle>Student</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Access your lessons and payments</p>
                    <ul className="text-sm space-y-1">
                      <li>• Register for Lessons</li>
                      <li>• View Schedule</li>
                      <li>• Payment History</li>
                      <li>• Request Lesson Slots</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {selectedRole && (
        <div className="p-4 bg-white border-b">
          <Button variant="ghost" onClick={() => setSelectedRole(null)}>
            ← Back to Role Selection
          </Button>
        </div>
      )}
      {renderInterface()}
    </div>
  );
}
