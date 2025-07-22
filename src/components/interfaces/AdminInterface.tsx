'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function AdminInterface() {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', instrument: 'Piano', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', instrument: 'Guitar', status: 'Active' },
  ]);

  const [instructors, setInstructors] = useState([
    { id: 1, name: 'Dr. Sarah Wilson', specialization: 'Piano', experience: '10 years', status: 'Active' },
    { id: 2, name: 'Mike Johnson', specialization: 'Guitar', experience: '8 years', status: 'Active' },
  ]);

  const [newStudent, setNewStudent] = useState({ name: '', email: '', instrument: '' });
  const [newInstructor, setNewInstructor] = useState({ name: '', specialization: '', experience: '' });

  const addStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.instrument) {
      setStudents([...students, { 
        id: students.length + 1, 
        ...newStudent, 
        status: 'Active' 
      }]);
      setNewStudent({ name: '', email: '', instrument: '' });
    }
  };

  const addInstructor = () => {
    if (newInstructor.name && newInstructor.specialization && newInstructor.experience) {
      setInstructors([...instructors, { 
        id: instructors.length + 1, 
        ...newInstructor, 
        status: 'Active' 
      }]);
      setNewInstructor({ name: '', specialization: '', experience: '' });
    }
  };

  return (
    <div className="min-h-screen bg- p-6">
      <div className="musical-notes"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-500 to-gradient-600 flex items-center justify-center mr-4">
            <span className="text-2xl"></span>
          </div>
          <div>
            <h1 className="text-4xl font-bold music-text-gradient">Administrator Dashboard</h1>
            <p className="text-purple-200 text-lg"><i>System management</i></p>
          </div>
        </div>
        
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="music-tabs">
            <TabsTrigger value="students" className="music-tab-trigger" > STUDENTS</TabsTrigger>
            <TabsTrigger value="instructors" className="music-tab-trigger">INSTRUCTORS</TabsTrigger>
            <TabsTrigger value="scheduling" className="music-tab-trigger">SCHEDULE</TabsTrigger>
            <TabsTrigger value="resources" className="music-tab-trigger">RESOURCES</TabsTrigger>
            <TabsTrigger value="payments" className="music-tab-trigger">PAYMENT</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl"></span>
                  <CardTitle className="text-2xl text-white">Student Registration & Enrollment</CardTitle>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="music-button"> Add Student</Button>
                  </DialogTrigger>
                  <DialogContent className="music-card border-purple-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-white text-xl">Add New Student</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Full Name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                        className="music-input text-white"
                      />
                      <Input
                        placeholder="Email Address"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                        className="music-input text-white"
                      />
                      <Input
                        placeholder="Preferred Instrument"
                        value={newStudent.instrument}
                        onChange={(e) => setNewStudent({...newStudent, instrument: e.target.value})}
                        className="music-input text-white"
                      />
                      <Button onClick={addStudent} className="music-button w-full">
                        🎵 Add Student
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="music-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="music-table th">Name</TableHead>
                        <TableHead className="music-table th">Email</TableHead>
                        <TableHead className="music-table th">Instrument</TableHead>
                        <TableHead className="music-table th">Status</TableHead>
                        <TableHead className="music-table th">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="music-table tbody">
                      {students.map((student) => (
                        <TableRow key={student.id} className="music-table tbody tr">
                          <TableCell className="text-white font-medium">{student.name}</TableCell>
                          <TableCell className="text-purple-200">{student.email}</TableCell>
                          <TableCell className="text-purple-200">{student.instrument}</TableCell>
                          <TableCell>
                            <span className="status-active">{student.status}</span>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-200 hover:text-white">
                              Edit
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

          <TabsContent value="instructors">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👨‍🏫</span>
                  <CardTitle className="text-2xl text-white">Instructor Profiles</CardTitle>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="music-button">✨ Add Instructor</Button>
                  </DialogTrigger>
                  <DialogContent className="music-card border-purple-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-white text-xl">Add New Instructor</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Full Name"
                        value={newInstructor.name}
                        onChange={(e) => setNewInstructor({...newInstructor, name: e.target.value})}
                        className="music-input text-white"
                      />
                      <Input
                        placeholder="Specialization"
                        value={newInstructor.specialization}
                        onChange={(e) => setNewInstructor({...newInstructor, specialization: e.target.value})}
                        className="music-input text-white"
                      />
                      <Input
                        placeholder="Years of Experience"
                        value={newInstructor.experience}
                        onChange={(e) => setNewInstructor({...newInstructor, experience: e.target.value})}
                        className="music-input text-white"
                      />
                      <Button onClick={addInstructor} className="music-button w-full">
                        🎼 Add Instructor
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="music-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="music-table th">Name</TableHead>
                        <TableHead className="music-table th">Specialization</TableHead>
                        <TableHead className="music-table th">Experience</TableHead>
                        <TableHead className="music-table th">Status</TableHead>
                        <TableHead className="music-table th">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="music-table tbody">
                      {instructors.map((instructor) => (
                        <TableRow key={instructor.id} className="music-table tbody tr">
                          <TableCell className="text-white font-medium">{instructor.name}</TableCell>
                          <TableCell className="text-purple-200">{instructor.specialization}</TableCell>
                          <TableCell className="text-purple-200">{instructor.experience}</TableCell>
                          <TableCell>
                            <span className="status-active">{instructor.status}</span>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-200 hover:text-white">
                               Edit
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

          <TabsContent value="scheduling">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📅</span>
                  <CardTitle className="text-2xl text-white">Smart Scheduling Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <span className="mr-2">🗓️</span>
                      Current Schedule
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                        <p className="font-medium text-white">🎹 Piano Lesson - John Doe</p>
                        <p className="text-sm text-purple-200">Monday 10:00 AM - Dr. Sarah Wilson</p>
                      </div>
                      <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                        <p className="font-medium text-white">🎸 Guitar Lesson - Jane Smith</p>
                        <p className="text-sm text-purple-200">Tuesday 2:00 PM - Mike Johnson</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <span className="mr-2">⚙️</span>
                      Schedule Management
                    </h3>
                    <div className="space-y-3">
                      <Button className="music-button w-full">
                        🤖 Auto-Schedule Lessons
                      </Button>
                      <Button variant="outline" className="w-full border-purple-500/50 text-purple-200 hover:text-white">
                        📆 View Calendar
                      </Button>
                      <Button variant="outline" className="w-full border-purple-500/50 text-purple-200 hover:text-white">
                        ⚠️ Resolve Conflicts
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏠</span>
                  <CardTitle className="text-2xl text-white">Resource Availability Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <span className="mr-2">🚪</span>
                      Practice Rooms
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 music-card border border-purple-500/30 rounded-lg">
                        <div>
                          <p className="font-medium text-white">🎹 Room A - Piano Studio</p>
                          <p className="text-sm text-purple-200">Grand Piano, 2 chairs</p>
                        </div>
                        <span className="status-active">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-4 music-card border border-purple-500/30 rounded-lg">
                        <div>
                          <p className="font-medium text-white">🎸 Room B - Guitar Studio</p>
                          <p className="text-sm text-purple-200">2 acoustic guitars, amps</p>
                        </div>
                        <span className="status-outstanding">In Use</span>
                      </div>
                      <div className="flex justify-between items-center p-4 music-card border border-purple-500/30 rounded-lg">
                        <div>
                          <p className="font-medium text-white">🥁 Room C - Drums Studio</p>
                          <p className="text-sm text-purple-200">Full drum set, soundproof</p>
                        </div>
                        <span className="status-active">Available</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <span className="mr-2">🎼</span>
                      Instruments
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 music-card border border-purple-500/30 rounded-lg">
                        <div>
                          <p className="font-medium text-white">🎹 Yamaha Grand Piano</p>
                          <p className="text-sm text-purple-200">Room A</p>
                        </div>
                        <span className="status-active">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-4 music-card border border-purple-500/30 rounded-lg">
                        <div>
                          <p className="font-medium text-white">🎸 Martin Acoustic Guitar</p>
                          <p className="text-sm text-purple-200">Room B</p>
                        </div>
                        <span className="status-active">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-4 music-card border border-purple-500/30 rounded-lg">
                        <div>
                          <p className="font-medium text-white">🥁 Pearl Drum Set</p>
                          <p className="text-sm text-purple-200">Room C</p>
                        </div>
                        <span className="status-pending">Maintenance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl"></span>
                  <CardTitle className="text-2xl text-white">Payment & Financial Reports</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="music-card border border-green-500/30">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-2">💵</div>
                      <h3 className="font-semibold text-lg text-white">Monthly Revenue</h3>
                      <p className="text-3xl font-bold text-green-400">$12,500</p>
                      <p className="text-sm text-purple-200">+15% from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="music-card border border-red-500/30">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-2">⚠️</div>
                      <h3 className="font-semibold text-lg text-white">Outstanding</h3>
                      <p className="text-3xl font-bold text-red-400">$2,300</p>
                      <p className="text-sm text-purple-200">3 overdue accounts</p>
                    </CardContent>
                  </Card>
                  <Card className="music-card border border-blue-500/30">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-2">👥</div>
                      <h3 className="font-semibold text-lg text-white">Active Students</h3>
                      <p className="text-3xl font-bold text-blue-400">{students.length}</p>
                      <p className="text-sm text-purple-200">Currently enrolled</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Button className="music-button">📊 Generate Monthly Report</Button>
                  <Button variant="outline" className="ml-4 border-purple-500/50 text-purple-200 hover:text-white">
                    📤 Export Payment Data
                  </Button>
                  <Button variant="outline" className="ml-4 border-purple-500/50 text-purple-200 hover:text-white">
                    📧 Send Payment Reminders
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