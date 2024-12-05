import { Exam } from '../types';

export const canRegisterForExam = (exam: Exam): boolean => {
  return exam.registeredStudents.length < exam.capacity;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};