'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function StudentInterface() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    instrument: '',
    experience: 'Beginner'
  });

  const [schedule, setSchedule] = useState([
    { id: 1, date: '2025-07-21', time: '10:00 AM', instructor: 'Dr. Sarah Wilson', room: 'Room A', status: 'Confirmed' },
    { id: 2, date: '2025-07-28', time: '10:00 AM', instructor: 'Dr. Sarah Wilson', room: 'Room A', status: 'Confirmed' },
    { id: 3, date: '2025-08-04', time: '10:00 AM', instructor: 'Dr. Sarah Wilson', room: 'Room A', status: 'Pending' },
  ]);

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, date: '2025-07-01', description: 'Piano Lessons - July', amount: 200, status: 'Paid' },
    { id: 2, date: '2025-06-01', description: 'Piano Lessons - June', amount: 200, status: 'Paid' },
    { id: 3, date: '2025-08-01', description: 'Piano Lessons - August', amount: 200, status: 'Outstanding' },
  ]);

  const [availableSlots, setAvailableSlots] = useState([
    { id: 1, date: '2025-07-25', time: '2:00 PM', instructor: 'Dr. Sarah Wilson', room: 'Room A' },
    { id: 2, date: '2025-07-26', time: '3:00 PM', instructor: 'Mike Johnson', room: 'Room B' },
    { id: 3, date: '2025-07-27', time: '11:00 AM', instructor: 'Dr. Sarah Wilson', room: 'Room A' },
  ]);

  const registerStudent = () => {
    if (registrationData.name && registrationData.email && registrationData.instrument) {
      setIsRegistered(true);
      // Reset form
      setRegistrationData({
        name: '',
        email: '',
        phone: '',
        instrument: '',
        experience: 'Beginner'
      });
    }
  };

  const requestSlot = (slotId: number) => {
    const slot = availableSlots.find(s => s.id === slotId);
    if (slot) {
      setSchedule([...schedule, {
        id: schedule.length + 1,
        date: slot.date,
        time: slot.time,
        instructor: slot.instructor,
        room: slot.room,
        status: 'Requested'
      }]);
      setAvailableSlots(availableSlots.filter(s => s.id !== slotId));
    }
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Student Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                />
                <Input
                  placeholder="Phone Number"
                  value={registrationData.phone}
                  onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                />
                <Input
                  placeholder="Preferred Instrument"
                  value={registrationData.instrument}
                  onChange={(e) => setRegistrationData({...registrationData, instrument: e.target.value})}
                />
                <select
                  className="w-full p-2 border rounded"
                  value={registrationData.experience}
                  onChange={(e) => setRegistrationData({...registrationData, experience: e.target.value})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <Button onClick={registerStudent} className="w-full">
                  Complete Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">My Schedule</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="slots">Available Slots</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Personal Lesson Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.map((lesson) => (
                      <TableRow key={lesson.id}>
                        <TableCell>{lesson.date}</TableCell>
                        <TableCell>{lesson.time}</TableCell>
                        <TableCell>{lesson.instructor}</TableCell>
                        <TableCell>{lesson.room}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-sm ${
                            lesson.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            lesson.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {lesson.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History and Outstanding Balances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">Current Balance</h3>
                      <p className="text-2xl font-bold text-red-600">$200.00</p>
                      <p className="text-sm text-gray-600">Due: August 1, 2025</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">Total Paid</h3>
                      <p className="text-2xl font-bold text-green-600">$400.00</p>
                      <p className="text-sm text-gray-600">Last 3 months</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">Next Payment</h3>
                      <p className="text-2xl font-bold text-blue-600">$200.00</p>
                      <p className="text-sm text-gray-600">September 1, 2025</p>
                    </CardContent>
                  </Card>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-sm ${
                            payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {payment.status === 'Outstanding' ? (
                            <Button size="sm">Pay Now</Button>
                          ) : (
                            <Button variant="outline" size="sm">Receipt</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slots">
            <Card>
              <CardHeader>
                <CardTitle>Browse and Request Available Lesson Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <h3 className="font-medium">{slot.date} at {slot.time}</h3>
                        <p className="text-sm text-gray-600">
                          Instructor: {slot.instructor} • Room: {slot.room}
                        </p>
                      </div>
                      <Button onClick={() => requestSlot(slot.id)}>
                        Request Slot
                      </Button>
                    </div>
                  ))}
                  {availableSlots.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      No available slots at the moment. Please check back later.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> John Doe</p>
                      <p><span className="font-medium">Email:</span> john@example.com</p>
                      <p><span className="font-medium">Phone:</span> (555) 123-4567</p>
                      <p><span className="font-medium">Instrument:</span> Piano</p>
                      <p><span className="font-medium">Level:</span> Intermediate</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Learning Progress</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Lessons Completed:</span> 24</p>
                      <p><span className="font-medium">Current Instructor:</span> Dr. Sarah Wilson</p>
                      <p><span className="font-medium">Enrollment Date:</span> January 15, 2025</p>
                      <p><span className="font-medium">Next Milestone:</span> Recital Performance</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>Update Profile</Button>
                  <Button variant="outline" className="ml-2">Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
