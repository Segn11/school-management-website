import React, { useState } from 'react';
import { BookOpen, TrendingUp, Award, Edit, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Grade {
  id: string;
  studentName: string;
  subject: string;
  assignment: string;
  grade: string;
  percentage: number;
  date: string;
  avatar: string;
}

const mockGrades: Grade[] = [
  {
    id: '1',
    studentName: 'John Smith',
    subject: 'Mathematics',
    assignment: 'Algebra Quiz',
    grade: 'A',
    percentage: 95,
    date: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  },
  {
    id: '2',
    studentName: 'Emma Johnson',
    subject: 'Science',
    assignment: 'Physics Lab Report',
    grade: 'A-',
    percentage: 88,
    date: '2024-01-14',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  },
  {
    id: '3',
    studentName: 'Michael Brown',
    subject: 'English',
    assignment: 'Essay Assignment',
    grade: 'B+',
    percentage: 82,
    date: '2024-01-13',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  },
  {
    id: '4',
    studentName: 'Sophie Davis',
    subject: 'History',
    assignment: 'Research Project',
    grade: 'A',
    percentage: 92,
    date: '2024-01-12',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  }
];

const GradesPage: React.FC = () => {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredGrades = grades.filter(grade => 
    selectedSubject === 'all' || grade.subject === selectedSubject
  );

  const renderTeacherView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Grade</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={grade.avatar}
                        alt={grade.studentName}
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{grade.subject}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{grade.assignment}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                      {grade.grade} ({grade.percentage}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(grade.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStudentView = () => {
    const studentGrades = grades.filter(g => g.studentName === user?.name);
    const avgGrade = studentGrades.reduce((sum, g) => sum + g.percentage, 0) / studentGrades.length;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall GPA</p>
                <p className="text-2xl font-bold text-gray-900">3.8</p>
                <p className="text-sm text-green-600">Above Average</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{avgGrade.toFixed(1)}%</p>
                <p className="text-sm text-blue-600">This Semester</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Recent Grades</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {studentGrades.map((grade) => (
                <div key={grade.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{grade.subject}</p>
                    <p className="text-sm text-gray-500">{grade.assignment}</p>
                    <p className="text-xs text-gray-400">{new Date(grade.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                      {grade.grade}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{grade.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Subject Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {['Mathematics', 'Science', 'English', 'History'].map(subject => {
                const subjectGrades = studentGrades.filter(g => g.subject === subject);
                const avg = subjectGrades.reduce((sum, g) => sum + g.percentage, 0) / subjectGrades.length;
                
                return (
                  <div key={subject} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{subject}</p>
                      <p className="text-sm text-gray-500">{subjectGrades.length} assignments</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${avg}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{avg.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grades</h1>
          <p className="text-gray-600">
            {user?.role === 'teacher' ? 'Manage student grades and assignments' : 'View your academic performance'}
          </p>
        </div>
      </div>

      {user?.role === 'teacher' || user?.role === 'admin' ? renderTeacherView() : renderStudentView()}

      {/* Add Grade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Grade</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Student</option>
                  <option value="john">John Smith</option>
                  <option value="emma">Emma Johnson</option>
                  <option value="michael">Michael Brown</option>
                  <option value="sophie">Sophie Davis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignment</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter assignment name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Grade</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0-100"
                  />
                </div>
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
                  Add Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradesPage;