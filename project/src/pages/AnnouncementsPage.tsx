import React, { useState } from 'react';
import { Plus, Pin, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  pinned: boolean;
  category: string;
  recipients: string[];
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Parent-Teacher Meeting Scheduled',
    content: 'We are pleased to announce that the parent-teacher meeting for Grade 10 will be held on March 15th, 2024. All parents are requested to attend.',
    author: 'Principal Johnson',
    date: '2024-01-15',
    priority: 'high',
    pinned: true,
    category: 'Meeting',
    recipients: ['parents', 'teachers']
  },
  {
    id: '2',
    title: 'Science Fair Registration Open',
    content: 'Registration for the annual science fair is now open. Students can register their projects until February 28th. For more information, contact the science department.',
    author: 'Mr. Davis',
    date: '2024-01-14',
    priority: 'medium',
    pinned: false,
    category: 'Event',
    recipients: ['students', 'teachers']
  },
  {
    id: '3',
    title: 'Library Hours Extended',
    content: 'The school library will now be open until 7 PM on weekdays to accommodate students who need extra study time. Weekend hours remain the same.',
    author: 'Librarian Smith',
    date: '2024-01-13',
    priority: 'low',
    pinned: false,
    category: 'General',
    recipients: ['students', 'teachers', 'parents']
  },
  {
    id: '4',
    title: 'Winter Break Schedule',
    content: 'Classes will be suspended from December 20th to January 5th for winter break. School will resume on January 6th, 2024.',
    author: 'Administration',
    date: '2024-01-12',
    priority: 'high',
    pinned: true,
    category: 'Holiday',
    recipients: ['students', 'teachers', 'parents']
  }
];

const AnnouncementsPage: React.FC = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    const matchesRole = announcement.recipients.includes(user?.role || '');
    return matchesCategory && matchesRole;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned);

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const togglePin = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, pinned: !a.pinned } : a
    ));
  };

  const canManageAnnouncements = user?.role === 'admin' || user?.role === 'teacher';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">Stay updated with school news and important information</p>
        </div>
        {canManageAnnouncements && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Announcement</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Meeting">Meeting</option>
              <option value="Event">Event</option>
              <option value="General">General</option>
              <option value="Holiday">Holiday</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Pin className="w-5 h-5 text-blue-600" />
            <span>Pinned Announcements</span>
          </h2>
          {pinnedAnnouncements.map(announcement => (
            <div key={announcement.id} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {announcement.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{announcement.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(announcement.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                {canManageAnnouncements && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => togglePin(announcement.id)}
                      className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded"
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Regular Announcements */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Announcements</h2>
        {regularAnnouncements.map(announcement => (
          <div key={announcement.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {announcement.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{announcement.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              {canManageAnnouncements && (
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => togglePin(announcement.id)}
                    className="text-gray-400 hover:text-blue-600 p-1 hover:bg-blue-50 rounded"
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-green-600 p-1 hover:bg-green-50 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="text-gray-400 hover:text-red-600 p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Announcement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Announcement</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter announcement content"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="general">General</option>
                    <option value="meeting">Meeting</option>
                    <option value="event">Event</option>
                    <option value="holiday">Holiday</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Students</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Teachers</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Parents</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm text-gray-700">Pin this announcement</label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;