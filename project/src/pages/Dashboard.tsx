import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  Award,
  AlertCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Teachers</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-blue-600">+3 new this month</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-sm text-green-600">+2.1% from last week</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Classes</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-sm text-gray-600">Across all grades</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New student registration: John Doe</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Teacher Sarah Johnson updated Grade 10A math scores</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Monthly attendance report generated</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">3 students with low attendance</p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">2 overdue fee payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">My Classes</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Active this semester</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">My Students</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-green-600">Across all classes</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-orange-600">Assignments to grade</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Today's Classes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Math - Grade 10A</p>
                <p className="text-sm text-blue-600">9:00 AM - 10:00 AM</p>
              </div>
              <div className="text-sm font-medium text-blue-600">Now</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Math - Grade 10B</p>
                <p className="text-sm text-gray-600">11:00 AM - 12:00 PM</p>
              </div>
              <div className="text-sm font-medium text-gray-600">Next</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <p className="font-medium text-blue-900">Take Attendance</p>
              <p className="text-sm text-blue-600">Mark student attendance for today</p>
            </button>
            <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <p className="font-medium text-green-900">Grade Assignments</p>
              <p className="text-sm text-green-600">Review and grade pending work</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Grade</p>
              <p className="text-2xl font-bold text-gray-900">Grade 10A</p>
              <p className="text-sm text-gray-600">Academic Year 2024</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">92.5%</p>
              <p className="text-sm text-green-600">Great job!</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Assignments</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-orange-600">Due this week</p>
            </div>
            <BookOpen className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Mathematics</p>
                <p className="text-sm text-blue-600">Ms. Johnson - Room 101</p>
              </div>
              <div className="text-sm font-medium text-blue-600">9:00 AM</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Science</p>
                <p className="text-sm text-gray-600">Mr. Davis - Lab 2</p>
              </div>
              <div className="text-sm font-medium text-gray-600">10:30 AM</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Grades</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Math Quiz</p>
                <p className="text-sm text-green-600">Algebra Chapter 5</p>
              </div>
              <div className="text-lg font-bold text-green-600">A</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Science Project</p>
                <p className="text-sm text-blue-600">Solar System Model</p>
              </div>
              <div className="text-lg font-bold text-blue-600">B+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderParentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Children</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Active students</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Performance</p>
              <p className="text-2xl font-bold text-gray-900">A-</p>
              <p className="text-sm text-green-600">Excellent</p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Messages</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-orange-600">From teachers</p>
            </div>
            <MessageSquare className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Children's Progress</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-blue-900">John Smith</p>
                <span className="text-sm text-blue-600">Grade 10A</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-600">Attendance: </span>
                  <span className="font-medium text-green-600">92%</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Grade: </span>
                  <span className="font-medium text-blue-600">A-</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-green-900">Emma Smith</p>
                <span className="text-sm text-green-600">Grade 8B</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-600">Attendance: </span>
                  <span className="font-medium text-green-600">96%</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Grade: </span>
                  <span className="font-medium text-green-600">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">John's math test score: A</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Emma's science project submitted</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Parent-teacher meeting scheduled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return renderAdminDashboard();
      case 'teacher':
        return renderTeacherDashboard();
      case 'student':
        return renderStudentDashboard();
      case 'parent':
        return renderParentDashboard();
      default:
        return <div>Role not recognized</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening in your school today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {renderDashboard()}
    </div>
  );
};

export default Dashboard;