'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type UserRole = 'admin' | 'instructor' | 'student';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        await register(email, password, selectedRole);
      } else {
        await login(email, password, selectedRole);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const roleOptions = [
    {
      value: 'admin' as UserRole,
      label: 'Administrator',
      icon: '',
      description: ''
    },
    {
      value: 'instructor' as UserRole,
      label: 'Instructor',
      icon: '',
      description: ''
    },
    {
      value: 'student' as UserRole,
      label: 'Student',
      icon: '',
      description: ''
    }
  ];

  return (
    <div className="min-h-screen musical-bg flex items-center justify-center p-6">
      
      <div className="musical-notes"></div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="music-card border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            {/* Logo */}
            <div className="mx-auto mb-4 w-100 h-100 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Sernan's Music Clinic Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  console.error('Logo failed to load');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <CardTitle className="text-3xl font-bold my-custom-gradient mb-2">
              Studio Management Platform🎸
              
            </CardTitle>
            <p className="text--200 text-lg font-medium">
              {isRegistering ? 'Create Your Account' : 'Welcome Back'}
            </p>
            <div className="rhythm-pattern w-20 h-1 mx-auto mt-3"></div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-white font-medium text-sm">Select Your Role:</label>
                <div className="grid grid-cols-1 gap-3">
                  {roleOptions.map((role) => (
                    <div
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        selectedRole === role.value
                          ? 'border-purple-400 bg-purple-500/20 scale-105'
                          : 'border-purple-500/30 bg-purple-500/10 hover:border-purple-400/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{role.icon}</span>
                        <div>
                          <p className="text-white font-semibold">{role.label}</p>
                          <p className="text-purple-200 text-sm">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="music-input h-12 pl-4 text-white placeholder:text-purple-300"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-purple-400"></span>
                  </div>
                </div>
                
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="music-input h-12 pl-4 text-white placeholder:text-purple-300"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-purple-400"></span>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 backdrop-blur-sm">
                  <p className="text-red-200 text-sm font-medium">{error}</p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="music-button w-full h-12 text-white font-semibold text-lg rounded-lg"
              >
                <span className="relative z-10">
                  {isRegistering ? 'Sign in' : `${roleOptions.find(r => r.value === selectedRole)?.icon} Sign In as ${roleOptions.find(r => r.value === selectedRole)?.label}`}
                </span>
              </Button>
              
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300"
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering 
                    ? '🎶' 
                    : '🎵'
                  }
                </Button>
              </div>
            </form>
            
            {/* Decorative Elements */}
            <div className="mt-8 flex justify-center items-center space-x-4 opacity-50">
              <span className="text-2xl animate-pulse">♪</span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <span className="text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>♫</span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <span className="text-2xl animate-pulse" style={{ animationDelay: '1s' }}>♪</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white-to-r from-gray-500/20 to-white-500/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
}