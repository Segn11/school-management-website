import React, { useState } from 'react';
import { Calendar, Check, X, Download, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AttendanceRecord {
  id: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  avatar: string;
}

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: '1',
    studentName: 'John Smith',
    date: '2024-01-15',
    status: 'present',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  },
  {
    id: '2',
    studentName: 'Emma Johnson',
    date: '2024-01-15',
    status: 'present',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  },
  {
    id: '3',
    studentName: 'Michael Brown',
    date: '2024-01-15',
    status: 'absent',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  },
  {
    id: '4',
    studentName: 'Sophie Davis',
    date: '2024-01-15',
    status: 'late',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  }
];

const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceData);
  const [selectedClass, setSelectedClass] = useState('10A');

  const handleAttendanceChange = (id: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceRecords(records =>
      records.map(record =>
        record.id === id ? { ...record, status } : record
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'absent':
        return <X className="w-4 h-4 text-red-600" />;
      case 'late':
        return <Calendar className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const renderTeacherView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="10A">Grade 10A</option>
                <option value="10B">Grade 10B</option>
                <option value="9A">Grade 9A</option>
                <option value="11A">Grade 11A</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2 pt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Save Attendance
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Attendance for {selectedClass} - {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <div className="space-y-4">
            {attendanceRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={record.avatar}
                    alt={record.studentName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{record.studentName}</p>
                    <p className="text-sm text-gray-500">Student ID: {record.id}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAttendanceChange(record.id, 'present')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === 'present' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleAttendanceChange(record.id, 'late')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === 'late' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
                    }`}
                  >
                    Late
                  </button>
                  <button
                    onClick={() => handleAttendanceChange(record.id, 'absent')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === 'absent' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Attendance</p>
              <p className="text-2xl font-bold text-gray-900">92.5%</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Days Present</p>
              <p className="text-2xl font-bold text-gray-900">148</p>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Days Absent</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <X className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Attendance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {attendanceRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-gray-500">Grade 10A</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(record.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600">
            {user?.role === 'teacher' ? 'Mark and manage student attendance' : 'View your attendance record'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="semester">This Semester</option>
          </select>
        </div>
      </div>

      {user?.role === 'teacher' || user?.role === 'admin' ? renderTeacherView() : renderStudentView()}
    </div>
  );
};

export default AttendancePage;