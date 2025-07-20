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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Administrator Dashboard</h1>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Student Registration & Enrollment</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Student</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Full Name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      />
                      <Input
                        placeholder="Instrument"
                        value={newStudent.instrument}
                        onChange={(e) => setNewStudent({...newStudent, instrument: e.target.value})}
                      />
                      <Button onClick={addStudent} className="w-full">
                        Add Student
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.instrument}</TableCell>
                        <TableCell>{student.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructors">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Instructor Profiles</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Instructor</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Instructor</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Full Name"
                        value={newInstructor.name}
                        onChange={(e) => setNewInstructor({...newInstructor, name: e.target.value})}
                      />
                      <Input
                        placeholder="Specialization"
                        value={newInstructor.specialization}
                        onChange={(e) => setNewInstructor({...newInstructor, specialization: e.target.value})}
                      />
                      <Input
                        placeholder="Years of Experience"
                        value={newInstructor.experience}
                        onChange={(e) => setNewInstructor({...newInstructor, experience: e.target.value})}
                      />
                      <Button onClick={addInstructor} className="w-full">
                        Add Instructor
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instructors.map((instructor) => (
                      <TableRow key={instructor.id}>
                        <TableCell>{instructor.name}</TableCell>
                        <TableCell>{instructor.specialization}</TableCell>
                        <TableCell>{instructor.experience}</TableCell>
                        <TableCell>{instructor.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduling">
            <Card>
              <CardHeader>
                <CardTitle>Smart Scheduling Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Current Schedule</h3>
                    <div className="space-y-2">
                      <div className="p-3 border rounded">
                        <p className="font-medium">Piano Lesson - John Doe</p>
                        <p className="text-sm text-gray-600">Monday 10:00 AM - Dr. Sarah Wilson</p>
                      </div>
                      <div className="p-3 border rounded">
                        <p className="font-medium">Guitar Lesson - Jane Smith</p>
                        <p className="text-sm text-gray-600">Tuesday 2:00 PM - Mike Johnson</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Schedule Adjustments</h3>
                    <Button className="w-full">Auto-Schedule Lessons</Button>
                    <Button variant="outline" className="w-full">View Calendar</Button>
                    <Button variant="outline" className="w-full">Conflict Resolution</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Availability Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Practice Rooms</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Room A - Piano</span>
                        <span className="text-green-600">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Room B - Guitar</span>
                        <span className="text-red-600">In Use</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Room C - Drums</span>
                        <span className="text-green-600">Available</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Instruments</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Yamaha Piano</span>
                        <span className="text-green-600">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Acoustic Guitar</span>
                        <span className="text-green-600">Available</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Drum Set</span>
                        <span className="text-yellow-600">Maintenance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment & Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">Monthly Revenue</h3>
                      <p className="text-2xl font-bold text-green-600">$12,500</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">Outstanding</h3>
                      <p className="text-2xl font-bold text-red-600">$2,300</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">Active Students</h3>
                      <p className="text-2xl font-bold text-blue-600">{students.length}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Button>Generate Monthly Report</Button>
                  <Button variant="outline">Export Payment Data</Button>
                  <Button variant="outline">Send Payment Reminders</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
