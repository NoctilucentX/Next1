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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Instructor Dashboard</h1>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">My Students</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="schedule">My Schedule</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Student List and Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Next Lesson</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.instrument}</TableCell>
                        <TableCell>{student.level}</TableCell>
                        <TableCell>{student.nextLesson}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Record Student Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.instrument} - {student.nextLesson}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={student.attendance === 'Present' ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, 'Present')}
                        >
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant={student.attendance === 'Absent' ? 'destructive' : 'outline'}
                          onClick={() => markAttendance(student.id, 'Absent')}
                        >
                          Absent
                        </Button>
                        <Button
                          size="sm"
                          variant={student.attendance === 'Late' ? 'secondary' : 'outline'}
                          onClick={() => markAttendance(student.id, 'Late')}
                        >
                          Late
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Personal Shift Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">This Week</h3>
                        <p className="text-2xl font-bold text-blue-600">12 Hours</p>
                        <p className="text-sm text-gray-600">8 lessons scheduled</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">Available Slots</h3>
                        <p className="text-2xl font-bold text-green-600">5 Hours</p>
                        <p className="text-sm text-gray-600">3 open time slots</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedule.map((slot) => (
                        <TableRow key={slot.id}>
                          <TableCell>{slot.day}</TableCell>
                          <TableCell>{slot.time}</TableCell>
                          <TableCell>{slot.student}</TableCell>
                          <TableCell>{slot.room}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              {slot.student === 'Available' ? 'Book Slot' : 'Reschedule'}
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

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Available Practice Rooms and Instruments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Practice Rooms</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Room A - Piano Studio</p>
                          <p className="text-sm text-gray-600">Grand Piano, 2 chairs</p>
                        </div>
                        <span className="text-green-600 font-medium">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Room B - Guitar Studio</p>
                          <p className="text-sm text-gray-600">2 acoustic guitars, amps</p>
                        </div>
                        <span className="text-red-600 font-medium">In Use</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Room C - Multi-purpose</p>
                          <p className="text-sm text-gray-600">Piano, drums, various instruments</p>
                        </div>
                        <span className="text-green-600 font-medium">Available</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Instruments</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Yamaha Grand Piano</p>
                          <p className="text-sm text-gray-600">Room A</p>
                        </div>
                        <span className="text-green-600 font-medium">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Martin Acoustic Guitar</p>
                          <p className="text-sm text-gray-600">Room B</p>
                        </div>
                        <span className="text-green-600 font-medium">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Pearl Drum Set</p>
                          <p className="text-sm text-gray-600">Room C</p>
                        </div>
                        <span className="text-yellow-600 font-medium">Maintenance</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button>Reserve Room</Button>
                  <Button variant="outline">Report Issue</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
