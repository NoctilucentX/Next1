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
          <div className="min-h-screen musical-bg p-6">
            <div className="musical-notes"></div>
            
            <div className="relative z-10 max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold music-text-gradient">
                      Sernan's Music Clinic
                    </h1>
                    <p className="text-purple-200 text-lg font-medium">
                      Harmony in Learning, Excellence in Music
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-purple-200 text-sm">Welcome back,</p>
                    <p className="text-white font-semibold">{user?.email}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="music-button border-purple-500/50 text-purple-200 hover:text-white"
                  >
                    🚪 Logout
                  </Button>
                </div>
              </div>
              
              {/* Role Selection Cards */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Choose Your Role</h2>
                <p className="text-purple-200 text-center mb-8">Select the interface you'd like to access</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Administrator Card */}
                <Card 
                  className="music-card cursor-pointer group border-0 shadow-2xl transform transition-all duration-300 hover:scale-105" 
                  onClick={() => handleRoleSelect('admin')}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">👑</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      Administrator
                    </CardTitle>
                    <div className="rhythm-pattern w-16 h-1 mx-auto"></div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-purple-200 mb-6 text-center font-medium">
                      Complete system management and oversight
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-green-400">🎓</span>
                        Student Registration & Enrollment
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-blue-400">👨‍🏫</span>
                        Instructor Profile Management
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-yellow-400">📅</span>
                        Smart Scheduling System
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-pink-400">🏠</span>
                        Resource Management
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-emerald-400">💰</span>
                        Financial Reports & Analytics
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Instructor Card */}
                <Card 
                  className="music-card cursor-pointer group border-0 shadow-2xl transform transition-all duration-300 hover:scale-105" 
                  onClick={() => handleRoleSelect('instructor')}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🎼</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      Instructor
                    </CardTitle>
                    <div className="rhythm-pattern w-16 h-1 mx-auto"></div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-purple-200 mb-6 text-center font-medium">
                      Manage your students and teaching schedule
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-blue-400">👥</span>
                        View Student Profiles & Progress
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-green-400">✅</span>
                        Record Student Attendance
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-yellow-400">🗓️</span>
                        Manage Personal Schedule
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-pink-400">🎹</span>
                        Access Practice Rooms & Instruments
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Student Card */}
                <Card 
                  className="music-card cursor-pointer group border-0 shadow-2xl transform transition-all duration-300 hover:scale-105" 
                  onClick={() => handleRoleSelect('student')}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🎶</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      Student
                    </CardTitle>
                    <div className="rhythm-pattern w-16 h-1 mx-auto"></div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-purple-200 mb-6 text-center font-medium">
                      Your personal learning journey dashboard
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-pink-400">📝</span>
                        Register for Music Lessons
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-blue-400">📅</span>
                        View Personal Schedule
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-green-400">💳</span>
                        Payment History & Billing
                      </div>
                      <div className="flex items-center text-sm text-purple-100">
                        <span className="mr-3 text-yellow-400">🕐</span>
                        Request Available Time Slots
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Decorative Musical Elements */}
              <div className="mt-16 flex justify-center items-center space-x-8 opacity-60">
                <span className="text-4xl animate-pulse">♪</span>
                <span className="text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>♫</span>
                <span className="text-4xl animate-pulse" style={{ animationDelay: '1s' }}>♪</span>
                <span className="text-6xl animate-pulse" style={{ animationDelay: '1.5s' }}>♬</span>
                <span className="text-4xl animate-pulse" style={{ animationDelay: '2s' }}>♪</span>
                <span className="text-5xl animate-pulse" style={{ animationDelay: '2.5s' }}>♫</span>
                <span className="text-4xl animate-pulse" style={{ animationDelay: '3s' }}>♪</span>
              </div>
            </div>
            
            {/* Background Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          </div>
        );
    }
  };

  return (
    <div>
      {selectedRole && (
        <div className="sticky top-0 z-50 p-4 musical-bg border-b border-purple-500/30 backdrop-blur-md">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedRole(null)}
            className="text-purple-200 hover:text-white hover:bg-purple-500/20 transition-all duration-300"
          >
            ← 🏠 Back to Dashboard
          </Button>
        </div>
      )}
      {renderInterface()}
    </div>
  );
}