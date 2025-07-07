import React, { useState } from 'react';
import { Clock, MapPin, User, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Class {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  duration: string;
  day: string;
  color: string;
}

const mockTimetable: Class[] = [
  {
    id: '1',
    subject: 'Mathematics',
    teacher: 'Ms. Johnson',
    room: 'Room 101',
    time: '09:00',
    duration: '60',
    day: 'Monday',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    subject: 'Science',
    teacher: 'Mr. Davis',
    room: 'Lab 2',
    time: '10:30',
    duration: '90',
    day: 'Monday',
    color: 'bg-green-500'
  },
  {
    id: '3',
    subject: 'English',
    teacher: 'Mrs. Wilson',
    room: 'Room 205',
    time: '13:00',
    duration: '60',
    day: 'Monday',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    subject: 'History',
    teacher: 'Mr. Brown',
    room: 'Room 301',
    time: '14:30',
    duration: '60',
    day: 'Monday',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    subject: 'Mathematics',
    teacher: 'Ms. Johnson',
    room: 'Room 101',
    time: '09:00',
    duration: '60',
    day: 'Tuesday',
    color: 'bg-blue-500'
  },
  {
    id: '6',
    subject: 'Physical Education',
    teacher: 'Coach Miller',
    room: 'Gymnasium',
    time: '10:30',
    duration: '90',
    day: 'Tuesday',
    color: 'bg-red-500'
  },
  {
    id: '7',
    subject: 'Art',
    teacher: 'Ms. Garcia',
    room: 'Art Studio',
    time: '13:00',
    duration: '90',
    day: 'Tuesday',
    color: 'bg-pink-500'
  },
];

const TimetablePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [selectedDay, setSelectedDay] = useState('all');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '09:00', '10:30', '12:00', '13:00', '14:30', '16:00'
  ];

  const getClassesForDay = (day: string) => {
    return mockTimetable.filter(cls => cls.day === day);
  };

  const getTodayClasses = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return mockTimetable.filter(cls => cls.day === today);
  };

  const getNextClass = () => {
    const todayClasses = getTodayClasses();
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    return todayClasses.find(cls => cls.time > currentTime);
  };

  const renderWeeklyTimetable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold">Weekly Timetable</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="current">Current Week</option>
              <option value="next">Next Week</option>
            </select>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:hidden"
            >
              <option value="all">All Days</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              {days.map(day => (
                <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map(time => (
              <tr key={time}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {time}
                </td>
                {days.map(day => {
                  const classForSlot = mockTimetable.find(cls => cls.day === day && cls.time === time);
                  return (
                    <td key={day} className="px-6 py-4 whitespace-nowrap">
                      {classForSlot ? (
                        <div className={`p-3 rounded-lg ${classForSlot.color} text-white`}>
                          <p className="text-sm font-medium">{classForSlot.subject}</p>
                          <p className="text-xs opacity-90">{classForSlot.teacher}</p>
                          <p className="text-xs opacity-90">{classForSlot.room}</p>
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-gray-100 text-gray-400">
                          <p className="text-sm">Free Period</p>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        {(selectedDay === 'all' ? days : [selectedDay]).map(day => (
          <div key={day} className="border-b border-gray-200 last:border-b-0">
            <div className="px-6 py-4 bg-gray-50">
              <h4 className="font-medium text-gray-900">{day}</h4>
            </div>
            <div className="p-6 space-y-3">
              {getClassesForDay(day).map(cls => (
                <div key={cls.id} className={`p-4 rounded-lg ${cls.color} text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{cls.subject}</h5>
                    <span className="text-sm opacity-90">{cls.time}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{cls.teacher}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{cls.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
          <p className="text-gray-600">View your class schedule and timings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">
            Week of {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Today's Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Today's Classes</h3>
          <div className="space-y-3">
            {getTodayClasses().slice(0, 3).map(cls => (
              <div key={cls.id} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${cls.color}`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{cls.subject}</p>
                  <p className="text-sm text-gray-500">{cls.time} - {cls.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Next Class</h3>
          {getNextClass() ? (
            <div className="space-y-3">
              <div className={`p-4 rounded-lg ${getNextClass()?.color} text-white`}>
                <p className="font-medium">{getNextClass()?.subject}</p>
                <div className="flex items-center space-x-4 text-sm opacity-90 mt-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{getNextClass()?.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{getNextClass()?.room}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No more classes today</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Classes Today</span>
              <span className="font-medium">{getTodayClasses().length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Weekly</span>
              <span className="font-medium">{mockTimetable.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Free Periods</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </div>
      </div>

      {renderWeeklyTimetable()}
    </div>
  );
};

export default TimetablePage;