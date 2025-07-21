'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function InstructorInterface() {
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      instrument: 'Piano', 
      level: 'Intermediate',
      nextLesson: '2025-07-21 10:00 AM',
      attendance: 'Present'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      instrument: 'Piano', 
      level: 'Beginner',
      nextLesson: '2025-07-22 2:00 PM',
      attendance: 'Present'
    },
  ]);

  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Monday', time: '10:00 AM - 11:00 AM', student: 'John Doe', room: 'Room A' },
    { id: 2, day: 'Tuesday', time: '2:00 PM - 3:00 PM', student: 'Jane Smith', room: 'Room A' },
    { id: 3, day: 'Wednesday', time: '3:00 PM - 4:00 PM', student: 'Available', room: 'Room A' },
  ]);

  const markAttendance = (studentId: number, status: string) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, attendance: status } : student
    ));
  };

  return (
    <div className="min-h-screen musical-bg p-6">
      <div className="musical-notes"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4">
            <span className="text-2xl">🎼</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold music-text-gradient">Instructor Dashboard</h1>
            <p className="text-purple-200 text-lg">Manage your students and teaching schedule</p>
          </div>
        </div>
        
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="music-tabs">
            <TabsTrigger value="students" className="music-tab-trigger">👥 My Students</TabsTrigger>
            <TabsTrigger value="attendance" className="music-tab-trigger">✅ Attendance</TabsTrigger>
            <TabsTrigger value="schedule" className="music-tab-trigger">🗓️ My Schedule</TabsTrigger>
            <TabsTrigger value="resources" className="music-tab-trigger">🎹 Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👥</span>
                  <CardTitle className="text-2xl text-white">Assigned Student List and Profiles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="music-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="music-table th">Student Name</TableHead>
                        <TableHead className="music-table th">Instrument</TableHead>
                        <TableHead className="music-table th">Level</TableHead>
                        <TableHead className="music-table th">Next Lesson</TableHead>
                        <TableHead className="music-table th">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="music-table tbody">
                      {students.map((student) => (
                        <TableRow key={student.id} className="music-table tbody tr">
                          <TableCell className="text-white font-medium">{student.name}</TableCell>
                          <TableCell className="text-purple-200">🎹 {student.instrument}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              student.level === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                              student.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {student.level}
                            </span>
                          </TableCell>
                          <TableCell className="text-purple-200">{student.nextLesson}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-200 hover:text-white">
                              👁️ View Profile
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✅</span>
                  <CardTitle className="text-2xl text-white">Record Student Attendance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="p-6 music-card border border-purple-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                            <span className="text-xl">🎓</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-white text-lg">{student.name}</h3>
                            <p className="text-sm text-purple-200">
                              🎹 {student.instrument} • {student.nextLesson}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button 
                            size="sm" 
                            className={`music-button ${student.attendance === 'Present' ? 'opacity-100' : 'opacity-50'}`}
                            onClick={() => markAttendance(student.id, 'Present')}
                          >
                            ✅ Present
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className={`border-red-500/50 text-red-200 hover:text-white hover:bg-red-500/20 ${
                              student.attendance === 'Absent' ? 'bg-red-500/20 text-white' : ''
                            }`}
                            onClick={() => markAttendance(student.id, 'Absent')}
                          >
                            ❌ Absent
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className={`border-yellow-500/50 text-yellow-200 hover:text-white hover:bg-yellow-500/20 ${
                              student.attendance === 'Late' ? 'bg-yellow-500/20 text-white' : ''
                            }`}
                            onClick={() => markAttendance(student.id, 'Late')}
                          >
                            ⏰ Late
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🗓️</span>
                  <CardTitle className="text-2xl text-white">Personal Shift Schedule</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="music-card border border-blue-500/30">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-2">⏰</div>
                        <h3 className="font-semibold text-lg text-white">This Week</h3>
                        <p className="text-3xl font-bold text-blue-400">12 Hours</p>
                        <p className="text-sm text-purple-200">8 lessons scheduled</p>
                      </CardContent>
                    </Card>
                    <Card className="music-card border border-green-500/30">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-2">🆓</div>
                        <h3 className="font-semibold text-lg text-white">Available Slots</h3>
                        <p className="text-3xl font-bold text-green-400">5 Hours</p>
                        <p className="text-sm text-purple-200">3 open time slots</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="music-table">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="music-table th">Day</TableHead>
                          <TableHead className="music-table th">Time</TableHead>
                          <TableHead className="music-table th">Student</TableHead>
                          <TableHead className="music-table th">Room</TableHead>
                          <TableHead className="music-table th">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="music-table tbody">
                        {schedule.map((slot) => (
                          <TableRow key={slot.id} className="music-table tbody tr">
                            <TableCell className="text-white font-medium">{slot.day}</TableCell>
                            <TableCell className="text-purple-200">{slot.time}</TableCell>
                            <TableCell className="text-purple-200">
                              {slot.student === 'Available' ? (
                                <span className="status-active">Available Slot</span>
                              ) : (
                                <>🎓 {slot.student}</>
                              )}
                            </TableCell>
                            <TableCell className="text-purple-200">🏠 {slot.room}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-purple-500/50 text-purple-200 hover:text-white"
                              >
                                {slot.student === 'Available' ? '📅 Book Slot' : '🔄 Reschedule'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎹</span>
                  <CardTitle className="text-2xl text-white">Available Practice Rooms and Instruments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <span className="mr-3">🚪</span>
                      Practice Rooms
                    </h3>
                    <div className="space-y-4">
                      <div className="p-6 music-card border border-purple-500/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                              <span className="text-lg">🎹</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Room A - Piano Studio</p>
                              <p className="text-sm text-purple-200">Grand Piano, 2 chairs, music stand</p>
                            </div>
                          </div>
                          <span className="status-active">Available</span>
                        </div>
                      </div>
                      
                      <div className="p-6 music-card border border-purple-500/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                              <span className="text-lg">🎸</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Room B - Guitar Studio</p>
                              <p className="text-sm text-purple-200">2 acoustic guitars, amplifiers</p>
                            </div>
                          </div>
                          <span className="status-outstanding">In Use</span>
                        </div>
                      </div>
                      
                      <div className="p-6 music-card border border-purple-500/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                              <span className="text-lg">🎵</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Room C - Multi-purpose</p>
                              <p className="text-sm text-purple-200">Piano, drums, various instruments</p>
                            </div>
                          </div>
                          <span className="status-active">Available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <span className="mr-3">🎼</span>
                      Instruments
                    </h3>
                    <div className="space-y-4">
                      <div className="p-6 music-card border border-purple-500/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                              <span className="text-lg">🎹</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Yamaha Grand Piano</p>
                              <p className="text-sm text-purple-200">Located in Room A</p>
                            </div>
                          </div>
                          <span className="status-active">Available</span>
                        </div>
                      </div>
                      
                      <div className="p-6 music-card border border-purple-500/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                              <span className="text-lg">🎸</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Martin Acoustic Guitar</p>
                              <p className="text-sm text-purple-200">Located in Room B</p>
                            </div>
                          </div>
                          <span className="status-active">Available</span>
                        </div>
                      </div>
                      
                      <div className="p-6 music-card border border-purple-500/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                              <span className="text-lg">🥁</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Pearl Drum Set</p>
                              <p className="text-sm text-purple-200">Located in Room C</p>
                            </div>
                          </div>
                          <span className="status-pending">Maintenance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-4">
                  <Button className="music-button">
                    🏠 Reserve Room
                  </Button>
                  <Button variant="outline" className="border-purple-500/50 text-purple-200 hover:text-white">
                    ⚠️ Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}