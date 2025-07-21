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
      <div className="min-h-screen musical-bg p-6">
        <div className="musical-notes"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <Card className="music-card border-0 shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <span className="text-3xl">🎶</span>
              </div>
              <CardTitle className="text-3xl music-text-gradient">Student Registration</CardTitle>
              <p className="text-purple-200 text-lg">Join Sernan's Music Clinic today!</p>
              <div className="rhythm-pattern w-20 h-1 mx-auto mt-3"></div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                  className="music-input text-white"
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                  className="music-input text-white"
                />
                <Input
                  placeholder="Phone Number"
                  value={registrationData.phone}
                  onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                  className="music-input text-white"
                />
                <Input
                  placeholder="Preferred Instrument"
                  value={registrationData.instrument}
                  onChange={(e) => setRegistrationData({...registrationData, instrument: e.target.value})}
                  className="music-input text-white"
                />
                <select 
                  className="w-full p-3 music-input text-white rounded-lg"
                  value={registrationData.experience}
                  onChange={(e) => setRegistrationData({...registrationData, experience: e.target.value})}
                >
                  <option value="Beginner">🌱 Beginner</option>
                  <option value="Intermediate">🎵 Intermediate</option>
                  <option value="Advanced">🎼 Advanced</option>
                </select>
                <Button onClick={registerStudent} className="music-button w-full h-12 text-lg">
                  🎶 Complete Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen musical-bg p-6">
      <div className="musical-notes"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mr-4">
            <span className="text-2xl">🎶</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold music-text-gradient">Student Dashboard</h1>
            <p className="text-purple-200 text-lg">Your musical learning journey</p>
          </div>
        </div>
        
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="music-tabs">
            <TabsTrigger value="schedule" className="music-tab-trigger">📅 My Schedule</TabsTrigger>
            <TabsTrigger value="payments" className="music-tab-trigger">💳 Payments</TabsTrigger>
            <TabsTrigger value="slots" className="music-tab-trigger">🕐 Available Slots</TabsTrigger>
            <TabsTrigger value="profile" className="music-tab-trigger">👤 Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📅</span>
                  <CardTitle className="text-2xl text-white">Personal Lesson Schedule</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="music-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="music-table th">Date</TableHead>
                        <TableHead className="music-table th">Time</TableHead>
                        <TableHead className="music-table th">Instructor</TableHead>
                        <TableHead className="music-table th">Room</TableHead>
                        <TableHead className="music-table th">Status</TableHead>
                        <TableHead className="music-table th">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="music-table tbody">
                      {schedule.map((lesson) => (
                        <TableRow key={lesson.id} className="music-table tbody tr">
                          <TableCell className="text-white font-medium">{lesson.date}</TableCell>
                          <TableCell className="text-purple-200">{lesson.time}</TableCell>
                          <TableCell className="text-purple-200">👨‍🏫 {lesson.instructor}</TableCell>
                          <TableCell className="text-purple-200">🏠 {lesson.room}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              lesson.status === 'Confirmed' ? 'status-active' :
                              lesson.status === 'Pending' ? 'status-pending' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {lesson.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-200 hover:text-white">
                              🔄 Reschedule
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

          <TabsContent value="payments">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💳</span>
                  <CardTitle className="text-2xl text-white">Payment History and Outstanding Balances</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="music-card border border-red-500/30">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-2">⚠️</div>
                      <h3 className="font-semibold text-lg text-white">Current Balance</h3>
                      <p className="text-3xl font-bold text-red-400">$200.00</p>
                      <p className="text-sm text-purple-200">Due: August 1, 2025</p>
                    </CardContent>
                  </Card>
                  <Card className="music-card border border-green-500/30">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-2">✅</div>
                      <h3 className="font-semibold text-lg text-white">Total Paid</h3>
                      <p className="text-3xl font-bold text-green-400">$400.00</p>
                      <p className="text-sm text-purple-200">Last 3 months</p>
                    </CardContent>
                  </Card>
                  <Card className="music-card border border-blue-500/30">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-2">📅</div>
                      <h3 className="font-semibold text-lg text-white">Next Payment</h3>
                      <p className="text-3xl font-bold text-blue-400">$200.00</p>
                      <p className="text-sm text-purple-200">September 1, 2025</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="music-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="music-table th">Date</TableHead>
                        <TableHead className="music-table th">Description</TableHead>
                        <TableHead className="music-table th">Amount</TableHead>
                        <TableHead className="music-table th">Status</TableHead>
                        <TableHead className="music-table th">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="music-table tbody">
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id} className="music-table tbody tr">
                          <TableCell className="text-white font-medium">{payment.date}</TableCell>
                          <TableCell className="text-purple-200">{payment.description}</TableCell>
                          <TableCell className="text-purple-200 font-semibold">${payment.amount}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              payment.status === 'Paid' ? 'status-active' : 'status-outstanding'
                            }`}>
                              {payment.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {payment.status === 'Outstanding' ? (
                              <Button size="sm" className="music-button">💳 Pay Now</Button>
                            ) : (
                              <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-200 hover:text-white">
                                📄 Receipt
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slots">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🕐</span>
                  <CardTitle className="text-2xl text-white">Browse and Request Available Lesson Slots</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableSlots.map((slot) => (
                    <div key={slot.id} className="p-6 music-card border border-purple-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                            <span className="text-xl">📅</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-white text-lg">
                              {slot.date} at {slot.time}
                            </h3>
                            <p className="text-sm text-purple-200">
                              👨‍🏫 Instructor: {slot.instructor} • 🏠 Room: {slot.room}
                            </p>
                          </div>
                        </div>
                        <Button 
                          onClick={() => requestSlot(slot.id)}
                          className="music-button"
                        >
                          ✨ Request Slot
                        </Button>
                      </div>
                    </div>
                  ))}
                  {availableSlots.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🎵</div>
                      <p className="text-purple-200 text-lg font-medium">
                        No available slots at the moment.
                      </p>
                      <p className="text-purple-300 text-sm">
                        Please check back later or contact your instructor.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="music-card border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👤</span>
                  <CardTitle className="text-2xl text-white">Student Profile</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="mr-3">ℹ️</span>
                        Personal Information
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Full Name</p>
                          <p className="text-white font-semibold">John Doe</p>
                        </div>
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Email Address</p>
                          <p className="text-white font-semibold">john@example.com</p>
                        </div>
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Phone Number</p>
                          <p className="text-white font-semibold">(555) 123-4567</p>
                        </div>
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Primary Instrument</p>
                          <p className="text-white font-semibold">🎹 Piano</p>
                        </div>
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Skill Level</p>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium">
                            Intermediate
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="mr-3">📈</span>
                        Learning Progress
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Lessons Completed</p>
                          <p className="text-white font-semibold text-2xl">24</p>
                        </div>
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Current Instructor</p>
                          <p className="text-white font-semibold">👨‍🏫 Dr. Sarah Wilson</p>
                        </div>
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Enrollment Date</p>
                          <p className="text-white font-semibold">January 15, 2025</p>
                        </div>
                        <div className="p-4 music-card border border-purple-500/30 rounded-lg">
                          <p className="text-purple-200 text-sm">Next Milestone</p>
                          <p className="text-white font-semibold">🎭 Recital Performance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-4">
                  <Button className="music-button">
                    ✏️ Update Profile
                  </Button>
                  <Button variant="outline" className="border-purple-500/50 text-purple-200 hover:text-white">
                    🔒 Change Password
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