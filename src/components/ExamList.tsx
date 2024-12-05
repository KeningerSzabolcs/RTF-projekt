import React from 'react';
import { Users, Calendar } from 'lucide-react';
import { Exam } from '../types';
import { canRegisterForExam, formatDate } from '../utils/examUtils';

interface ExamListProps {
  exams: Exam[];
  onRegister: (examId: string) => void;
}

export default function ExamList({ exams, onRegister }: ExamListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Exams</h2>
      {exams.map((exam) => (
        <div
          key={exam.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{exam.title}</h3>
              <div className="flex items-center mt-2 text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(exam.date)}</span>
              </div>
              <div className="flex items-center mt-2 text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>
                  {exam.registeredStudents.length} / {exam.capacity} students registered
                </span>
              </div>
            </div>
            <button
              onClick={() => onRegister(exam.id)}
              disabled={!canRegisterForExam(exam)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                canRegisterForExam(exam)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Register
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}