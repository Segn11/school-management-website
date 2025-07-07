import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  BookOpen, 
  ClipboardList, 
  MessageSquare, 
  User,
  BarChart3,
  Settings,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  roles: string[];
}

const navigationItems: NavItem[] = [
  { name: 'Dashboard', icon: Home, path: '/dashboard', roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Students', icon: Users, path: '/students', roles: ['admin', 'teacher'] },
  { name: 'Attendance', icon: ClipboardList, path: '/attendance', roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Grades', icon: BookOpen, path: '/grades', roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Timetable', icon: Calendar, path: '/timetable', roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Announcements', icon: MessageSquare, path: '/announcements', roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Reports', icon: BarChart3, path: '/reports', roles: ['admin', 'teacher'] },
  { name: 'Profile', icon: User, path: '/profile', roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Settings', icon: Settings, path: '/settings', roles: ['admin'] },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 pt-16 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <GraduationCap className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-lg font-semibold">School Portal</h2>
            <p className="text-sm text-gray-400 capitalize">{user?.role} Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          {filteredItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;