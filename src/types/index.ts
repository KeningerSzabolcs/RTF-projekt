import './index.css';
export interface Exam {
  id: string;
  title: string;
  date: string;
  capacity: number;
  registeredStudents: Student[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface ExamFormData {
  title: string;
  date: string;
  capacity: number;
}