import { useState } from 'react';
import { Exam, Student, ExamFormData } from './types';
import ExamForm from './components/ExamForm';
import ExamList from './components/ExamList';
import StudentRegistration from './components/StudentRegistration';
import './index.css';
function App() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  const handleCreateExam = (data: ExamFormData) => {
    const newExam: Exam = {
      id: crypto.randomUUID(),
      ...data,
      registeredStudents: [],
    };
    setExams([...exams, newExam]);
  };

  const handleStudentRegistration = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      id: crypto.randomUUID(),
      ...studentData,
    };
    setCurrentStudent(newStudent);
  };

  const handleExamRegistration = (examId: string) => {
    if (!currentStudent) return;

    setExams(exams.map(exam => {
      if (exam.id === examId) {
        return {
          ...exam,
          registeredStudents: [...exam.registeredStudents, currentStudent],
        };
      }
      return exam;
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-5xl mx-auto py-6 px-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Exam Registration System
      </h1>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <ExamForm onSubmit={handleCreateExam} />
          {!currentStudent && (
            <StudentRegistration onSubmit={handleStudentRegistration} />
          )}
        </div>
  
        <div>
          {currentStudent ? (
            <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              <p className="text-green-700">
                Logged in as: <strong>{currentStudent.name}</strong>
              </p>
            </div>
          ) : (
            <div className="mb-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
              <p className="text-yellow-700">
                Please register as a student to sign up for exams.
              </p>
            </div>
          )}
          
          <ExamList exams={exams} onRegister={handleExamRegistration} />
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default App;