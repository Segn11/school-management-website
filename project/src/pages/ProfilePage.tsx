import React, { useState } from 'react';
import { Edit, Save, X, Camera, Mail, Phone, MapPin, Calendar, User, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '1990-01-01',
    bio: 'Passionate educator with 10+ years of experience in mathematics.',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    subject: user?.subject || '',
    class: user?.class || '',
    employeeId: 'EMP001',
    studentId: 'STU001',
    parentOf: user?.children || []
  });

  const handleSave = () => {
    // Here you would typically save to a backend
    setIsEditing(false);
    console.log('Profile updated:', editedProfile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345',
      dateOfBirth: '1990-01-01',
      bio: 'Passionate educator with 10+ years of experience in mathematics.',
      emergencyContact: 'Jane Doe - +1 (555) 987-6543',
      subject: user?.subject || '',
      class: user?.class || '',
      employeeId: 'EMP001',
      studentId: 'STU001',
      parentOf: user?.children || []
    });
  };

  const renderProfileField = (label: string, value: string, field: keyof typeof editedProfile, icon: React.ComponentType<{ className?: string }>) => {
    const Icon = icon;
    return (
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-400" />
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          {isEditing ? (
            field === 'bio' ? (
              <textarea
                value={editedProfile[field] as string}
                onChange={(e) => setEditedProfile({ ...editedProfile, [field]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            ) : (
              <input
                type={field === 'dateOfBirth' ? 'date' : field === 'email' ? 'email' : 'text'}
                value={editedProfile[field] as string}
                onChange={(e) => setEditedProfile({ ...editedProfile, [field]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )
          ) : (
            <p className="text-gray-900">{value}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mt-4">{user?.name}</h2>
              <p className="text-gray-600 capitalize">{user?.role}</p>
              {user?.subject && <p className="text-sm text-gray-500 mt-1">{user.subject} Teacher</p>}
              {user?.class && <p className="text-sm text-gray-500 mt-1">{user.class}</p>}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm text-gray-900">Jan 2024</span>
                </div>
                {user?.role === 'teacher' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Employee ID</span>
                    <span className="text-sm text-gray-900">{editedProfile.employeeId}</span>
                  </div>
                )}
                {user?.role === 'student' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Student ID</span>
                    <span className="text-sm text-gray-900">{editedProfile.studentId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="space-y-6">
              {renderProfileField('Full Name', editedProfile.name, 'name', User)}
              {renderProfileField('Email Address', editedProfile.email, 'email', Mail)}
              {renderProfileField('Phone Number', editedProfile.phone, 'phone', Phone)}
              {renderProfileField('Address', editedProfile.address, 'address', MapPin)}
              {renderProfileField('Date of Birth', editedProfile.dateOfBirth, 'dateOfBirth', Calendar)}
              
              {user?.role === 'teacher' && (
                renderProfileField('Subject', editedProfile.subject, 'subject', GraduationCap)
              )}
              
              {user?.role === 'student' && (
                renderProfileField('Class', editedProfile.class, 'class', GraduationCap)
              )}
              
              {user?.role === 'parent' && (
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Of</label>
                    <div className="space-y-1">
                      {editedProfile.parentOf.map((child, index) => (
                        <p key={index} className="text-gray-900">{child}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {renderProfileField('Bio', editedProfile.bio, 'bio', User)}
              {renderProfileField('Emergency Contact', editedProfile.emergencyContact, 'emergencyContact', Phone)}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email updates about grades, attendance, and announcements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive text messages for urgent announcements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;